import type messages from '@/messages/en.json'
import type {routing} from '@/src/i18n/routing'

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number]
    Messages: typeof messages
  }
}

// Global types
declare global {
  type Params = {
    params: Promise<{
      locale: (typeof routing.locales)[number]
    }>
  }

  type PropertyLocation = 'mocca-sea' | 'mocca-city'
  type PropertySlug = 'sea-dimitra' | 'sea-georgia' | 'city-dimitra'

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
