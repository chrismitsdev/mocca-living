import enMessages from '#/messages/en.json'

type Messages = typeof enMessages

declare global {
  interface IntlMessages extends Messages {}

  type Params = {
    params: {
      locale: string
    }
  }

  type Admin = {
    id: string
    name: string
    email: string
    phone: string
  }
}