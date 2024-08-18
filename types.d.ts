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

  type ContactFormValues<
    T = Omit<
      IntlMessages['Pages']['Contact']['Form']['fields'],
      'checkIn' | 'checkOut' | 'consentData'
    >
  > = {
    [K in keyof T]: string
  } & {
    checkIn: Date
    checkOut: Date
    consentData: boolean
  }

  type ContactFormResponse = {
    status: 'success' | 'error'
    title: string
    message: string
  }

  type CustomIconProps = React.SVGProps<SVGSVGElement> & {
    size?: number
  }

  type Villa = {
    name: string
    guests: number
    area: number
    bedrooms: number
    bathrooms: number
    features: string[]
  }
}
