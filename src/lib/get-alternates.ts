import type {Metadata} from 'next'
import {getLocale} from 'next-intl/server'
import {getPathname} from '@/src/i18n/navigation'
import {routing} from '@/src/i18n/routing'

type Href = Parameters<typeof getPathname>[0]['href']

// Self-referencing canonical plus hreflang links for every locale
export async function getAlternates(
  href: Href
): Promise<Metadata['alternates']> {
  const locale = await getLocale()

  return {
    canonical: getPathname({locale, href}),
    languages: {
      ...Object.fromEntries(
        routing.locales.map((locale) => [locale, getPathname({locale, href})])
      ),
      'x-default': getPathname({locale: routing.defaultLocale, href})
    }
  }
}
