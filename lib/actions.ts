'use server'

import {getTranslations} from 'next-intl/server'
import {Resend} from 'resend'
import {ContactFormTemplate} from '@/components/page/contact/contact-form-template'
import {createUser} from '#/services/create-user'

const resend = new Resend(process.env.RESEND_ONBOARDING_API_KEY)

function generateResponse(
  status: 'success' | 'error',
  result:
    | Awaited<ReturnType<typeof getTranslations<'Components.Form.response'>>>
    | {title: string; message: string}
) {
  if (typeof result === 'function') {
    return {
      status,
      title: result(`${status}.title`),
      message: result(`${status}.message`)
    }
  }

  return {
    status,
    title: result.title,
    message: result.message
  }
}

export async function sendContactForm(formData: ContactFormData) {
  const t = await getTranslations('Components.Form.response')

  try {
    const {error} = await resend.emails.send({
      from: 'Mocca Living <onboarding@resend.dev>',
      to: ['chrismits88@gmail.com'],
      subject: 'Test email',
      react: ContactFormTemplate({formData})
    })

    await createUser(formData.fullName, formData.email)

    if (error) {
      return generateResponse('error', t)
    }

    return generateResponse('success', t)
  } catch (e) {
    console.error(e)
    const isError = e instanceof Error

    return generateResponse('error', {
      title: isError ? e.name : 'Catch block error',
      message: isError ? e.message : 'An error occured in the catch block.'
    })
  }
}
