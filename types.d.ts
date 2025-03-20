import {routing} from '@/src/i18n/routing'
import messages from '@/messages/en.json'

type Locale = (typeof routing.locales)[number]
type Messages = typeof messages

declare module 'next-intl' {
  interface AppConfig {
    Locale: Locale
    Messages: Messages
  }
}

declare global {
  type Params = {
    params: Promise<{
      locale: Locale
    }>
  }

  type Slug = 'dimitra' | 'georgia'

  type CustomIconProps = React.SVGProps<SVGSVGElement> & {
    size?: number
  }

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
