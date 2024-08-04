import enMessages from '#/messages/en.json'
import {locales} from '#/lib/next-intl-config'
import {ErrorResponse} from 'resend'

type Messages = typeof enMessages

declare global {
  interface IntlMessages extends Messages {}

  type Params = {
    params: {
      locale: typeof locales[number]
    }
  }

  type ContactFormValues<
    T = Omit<
      IntlMessages['Pages']['Contact']['Form']['fields'], 
      'checkIn' | 'checkOut'
    >
  > = {
    [K in keyof T]: string
  } & {
    checkIn: Date
    checkOut: Date
  }

  type ContactFormResponse = {
    status: 'success' | 'error' | 'catch-error'
    title: string
    message: string
  }
}