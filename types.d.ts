import enMessages from '#/messages/en.json'
import {locales} from '#/lib/next-intl-config'

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

  type Slug = keyof IntlMessages['Pages']['Accomodation']['Slug']
}
