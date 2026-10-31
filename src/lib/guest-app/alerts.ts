import {Resend} from 'resend'
import {guestAppEnv} from './env'

/** Plain-text alert to the developer */
export async function sendAlert(subject: string, lines: string[]) {
  const resend = new Resend(guestAppEnv.resendApiKey())
  const {error} = await resend.emails.send({
    from: 'Mocca Living Guest App <info@moccaliving.com>',
    to: guestAppEnv.alertEmail(),
    subject,
    text: lines.join('\n')
  })
  if (error) throw new Error(`Alert email failed: ${error.message}`)
}
