import {Resend} from 'resend'
import {guestAppEnv} from '../env'

/** Email the admin login link (Greek; the page is Greek only) */
export async function sendLoginEmail(email: string, token: string) {
  const link = `${guestAppEnv.appUrl()}/admin/login/verify?token=${encodeURIComponent(token)}`
  const resend = new Resend(guestAppEnv.resendApiKey())

  const {error} = await resend.emails.send({
    from: 'Mocca Living <info@moccaliving.com>',
    to: email,
    subject: 'Σύνδεση στη διαχείριση του Guest App',
    text: [
      'Για να συνδεθείτε στη διαχείριση του Guest App, ανοίξτε τον παρακάτω σύνδεσμο:',
      '',
      link,
      '',
      'Ο σύνδεσμος λήγει σε 15 λεπτά και χρησιμοποιείται μία φορά.',
      'Αν δεν ζητήσατε σύνδεση, αγνοήστε αυτό το email.'
    ].join('\n'),
    html: `<p>Για να συνδεθείτε στη διαχείριση του Guest App, ανοίξτε τον παρακάτω σύνδεσμο:</p>
<p><a href="${link}">Σύνδεση στη διαχείριση</a></p>
<p>Ο σύνδεσμος λήγει σε 15 λεπτά και χρησιμοποιείται μία φορά.<br />Αν δεν ζητήσατε σύνδεση, αγνοήστε αυτό το email.</p>`
  })
  if (error) throw new Error(`Login email failed: ${error.message}`)
}
