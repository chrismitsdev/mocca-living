import {Resend} from 'resend'
import {getTranslations} from 'next-intl/server'
import {ContactFormTemplate} from '@/components/page/contact/contact-form-template'

const resend = new Resend(process.env.RESEND_ONBOARDING_API_KEY)

export async function POST(request: Request) {
  const formData = await request.json() as Omit<ContactFormValues, 'consentData'>
  const t = await getTranslations('Pages.Contact.Form.response')

  const successObj: ContactFormResponse = {
    status: 'success',
    title: t('success.title'),
    message: t('success.message')
  }

  const errorObj: ContactFormResponse = {
    status: 'error',
    title: t('error.title'),
    message: t('error.message')
  }

  try {
    const {error} = await resend.emails.send({
      from: 'Mocca Living <onboarding@resend.dev>',
      to: ['chrismits88@gmail.com'],
      subject: 'Test email',
      react: ContactFormTemplate({formData}),
    })

    if (error) {
      console.log(error.name, error.message)
      return Response.json(errorObj)
    }

    return Response.json(successObj)
  } catch (error) {
    return Response.json(
      {
        status: 'error',
        title: 'Catch block error',
        message: 'An error occured in the catch-block of the contact form route handler.'
      } as ContactFormResponse
    )
  }
}