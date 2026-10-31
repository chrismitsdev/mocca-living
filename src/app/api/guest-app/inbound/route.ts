import {Resend} from 'resend'
import {sendAlert} from '@/src/lib/guest-app/alerts'
import {guestAppEnv} from '@/src/lib/guest-app/env'
import {processReceivedEmail} from '@/src/lib/guest-app/inbound'
import {createUpstashStore} from '@/src/lib/guest-app/store/upstash'

// Resend webhook for emails received on the guest-app inbound address
// (reservation emails forwarded from the owner's mailbox)

export const maxDuration = 30

type ReceivedEvent = {
  type: string
  data?: {
    email_id?: string
    from?: string
    subject?: string
    to?: string[]
    received_for?: string[]
  }
}

export async function POST(request: Request) {
  const payload = await request.text()
  // Read before verifying: missing configuration is a server error (500),
  // not an invalid signature
  const resend = new Resend(guestAppEnv.resendApiKey())
  const webhookSecret = guestAppEnv.inboundWebhookSecret()

  let event: ReceivedEvent
  try {
    event = resend.webhooks.verify({
      payload,
      headers: {
        id: request.headers.get('svix-id') ?? '',
        timestamp: request.headers.get('svix-timestamp') ?? '',
        signature: request.headers.get('svix-signature') ?? ''
      },
      webhookSecret
    }) as ReceivedEvent
  } catch {
    return Response.json({error: 'Invalid signature'}, {status: 401})
  }

  const data = event.data
  if (event.type !== 'email.received' || !data?.email_id) {
    return Response.json({status: 'ignored', reason: 'not a received email'})
  }

  const recipients = [...(data.received_for ?? []), ...(data.to ?? [])].map(
    (address) => address.toLowerCase()
  )
  if (!recipients.includes(guestAppEnv.inboundAddress())) {
    return Response.json({status: 'ignored', reason: 'other recipient'})
  }

  try {
    const outcome = await processReceivedEmail(
      {
        email_id: data.email_id,
        from: data.from ?? '',
        subject: data.subject ?? ''
      },
      {
        store: createUpstashStore(),
        alert: sendAlert,
        fetchRaw: async (emailId) => {
          const {data: email, error} =
            await resend.emails.receiving.get(emailId)
          const url = email?.raw?.download_url
          if (error || !url) {
            throw new Error(
              `Raw email unavailable: ${error?.message ?? 'no url'}`
            )
          }
          const response = await fetch(url)
          if (!response.ok) {
            throw new Error(`Raw email download failed: ${response.status}`)
          }
          return Buffer.from(await response.arrayBuffer())
        }
      }
    )
    console.info('guest-app inbound', data.email_id, JSON.stringify(outcome))
    return Response.json(outcome)
  } catch (error) {
    // A non-2xx response makes Resend retry the delivery later
    console.error('guest-app inbound failed', data.email_id, error)
    return Response.json({error: 'Processing failed'}, {status: 500})
  }
}
