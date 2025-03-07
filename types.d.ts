import enMessages from '@/messages/en.json'
import {routing} from '@/src/i18n/routing'

type Messages = typeof enMessages

declare global {
  interface IntlMessages extends Messages {}

  type Locale = (typeof routing.locales)[number]

  type Params = {
    params: Promise<{
      locale: Locale
    }>
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
    trackId: number
    artist: string
    title: string
    src: string
    duration?: number
  }
}
