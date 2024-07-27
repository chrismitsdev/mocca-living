import enMessages from '#/messages/en.json'
import {locales} from '#/lib/next-intl-config'

type Messages = typeof enMessages

declare global {
  interface IntlMessages extends Messages {}

  type Params = {
    params: {
      locale: typeof locales[number]
    }
  }

  type Admin = {
    id: string
    name: string
    email: string
    phone: string
  }
}