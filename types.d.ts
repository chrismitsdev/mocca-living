import enMessages from '#/messages/en.json'
import {locales} from '@/i18n/routing'

type Messages = typeof enMessages

declare global {
  interface IntlMessages extends Messages {}

  type Params = {
    params: {
      locale: (typeof locales)[number]
    }
  }

  type ContactFormData = {
    fullName: string
    email: string
    phone: string
    checkIn: Date
    checkOut: Date
    villa: string
    message: string
    consentData: boolean
  }

  type CustomIconProps = React.SVGProps<SVGSVGElement> & {
    size?: number
  }

  type Slug = keyof Omit<
    IntlMessages['Pages']['Accomodation']['Slug'],
    'headers'
  >

  type User = {
    id: number
    created_at: string
    name: string
    email: string
  }

  type Song = {
    id: number
    artist: string
    title: string
    src: string
    duration?: number
  }
}
