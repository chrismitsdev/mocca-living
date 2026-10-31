import {type OriginResult, verifyOrigin} from './email/origin'
import {decodeEmailBody, parseReservationBody} from './email/parse'
import type {KeyValueStore} from './store/kv'
import {type ApplyOutcome, applyReservationEmail} from './store/reservations'

// Processing of one email received on the inbound address:
// fetch the raw message → verify origin → parse the body → store or alert.
// Kept free of Resend/Upstash specifics so it can be tested in isolation

export type ReceivedEmail = {
  email_id: string
  from: string
  subject: string
}

export type InboundDeps = {
  store: KeyValueStore
  fetchRaw: (emailId: string) => Promise<Buffer>
  alert: (subject: string, lines: string[]) => Promise<void>
  verify?: (raw: Buffer) => Promise<OriginResult>
  now?: () => Date
}

export type InboundOutcome =
  | {status: 'stored'; outcome: ApplyOutcome; confirmation: string}
  | {status: 'ignored'; reason: string}
  | {status: 'rejected'; reason: string}
  | {status: 'failed'; reason: string}

/** Senders whose emails we expect to be reservations */
const RESERVATION_SENDER = /@(primal-res\.com|revplus\.com|hotelo\.gr)\b/i

export async function processReceivedEmail(
  email: ReceivedEmail,
  {
    store,
    fetchRaw,
    alert,
    verify = (raw) => verifyOrigin(raw),
    now = () => new Date()
  }: InboundDeps
): Promise<InboundOutcome> {
  const details = [
    `Resend email id: ${email.email_id}`,
    `From: ${email.from}`,
    `Subject: ${email.subject}`
  ]

  const raw = await fetchRaw(email.email_id)
  const origin = await verify(raw)

  if (!origin.ok) {
    // Only worth an alert when it claims to come from a reservation source
    if (RESERVATION_SENDER.test(email.from)) {
      await alert('Guest app: reservation email failed the origin check', [
        `Reason: ${origin.reason}`,
        ...details
      ])
      return {status: 'rejected', reason: origin.reason}
    }
    return {status: 'ignored', reason: `origin: ${origin.reason}`}
  }

  const result = parseReservationBody(origin.source, await decodeEmailBody(raw))

  if (result.type === 'ignored') {
    return {status: 'ignored', reason: result.reason}
  }
  if (result.type === 'failed') {
    await alert('Guest app: reservation email could not be read', [
      `Reason: ${result.reason}`,
      `Source: ${origin.source} (${origin.domain}, via ${origin.method})`,
      ...details
    ])
    return {status: 'failed', reason: result.reason}
  }

  const outcome = await applyReservationEmail(store, result.reservation, now())
  return {
    status: 'stored',
    outcome,
    confirmation: result.reservation.confirmation
  }
}
