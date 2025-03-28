import {type MetadataRoute} from 'next'
import {type Locale} from 'next-intl'
import {routing} from '@/src/i18n/routing'
import {getPathname} from '@/src/i18n/navigation'

type Href = Parameters<typeof getPathname>[0]['href']

const host =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://moccaliving.com'

const routes = [
  'accommodation',
  'accommodation/dimitra',
  'accommodation/georgia',
  'contact',
  'privacy',
  'cookies',
  'rules'
]

function getEntry(href: Href): MetadataRoute.Sitemap[0] {
  return {
    url: getUrl(href, routing.defaultLocale),
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, getUrl(href, locale)])
      )
    }
  }
}

function getUrl(href: Href, locale: Locale) {
  const pathname = getPathname({locale, href})
  return host + pathname
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [getEntry('/'), ...routes.map((s) => getEntry(`/${s}`))]
}
