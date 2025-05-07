import {Resend} from 'resend'
import {type Locale} from 'next-intl'
import {getTranslations} from 'next-intl/server'
import {type ContactFormActionState} from '@/src/lib/actions'
import {ContactFormInternal} from '@/src/components/email/contact-form-internal'
import {ContactFormClient} from '@/src/components/email/contact-form-client'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactForm(
  formData: ContactFormActionState['data'],
  locale: Locale
) {
  const t = await getTranslations({
    locale,
    namespace: 'Components.ContactFormClient'
  })

  try {
    const {error} = await resend.batch.send([
      {
        from: 'Mocca Living <info@moccaliving.com>',
        subject: 'Φόρμα επικοινωνίας - Mocca Living',
        react: ContactFormInternal(formData) as React.JSX.Element,
        ...(process.env.NODE_ENV === 'production'
          ? {
              to: ['apefthimiadou@gmail.com', 'mokalis@gmail.com'],
              cc: 'chrismits88@gmail.com'
            }
          : {
              to: 'chrismits88@gmail.com'
            })
      },
      {
        from: 'Mocca Living <info@moccaliving.com>',
        subject: t('subject'),
        to: formData.email,
        replyTo: 'info@moccaliving.com',
        react: ContactFormClient({formData, locale}) as React.JSX.Element
      }
    ])

    if (error) {
      return error
    }
  } catch (error) {
    console.error(error)
  }
}
