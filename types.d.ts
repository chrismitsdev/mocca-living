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

  type PropertyLocation = 'mocca-by-the-sea' | 'mocca-city'
  type PropertySlug =
    | 'mocca-by-the-sea-dimitra'
    | 'mocca-by-the-sea-georgia'
    | 'mocca-city'
  type CustomIconProps = React.SVGProps<SVGSVGElement> & {
    size?: number
  }
}
