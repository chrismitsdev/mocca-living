import type {MetadataRoute} from 'next'
import type {Locale} from 'next-intl'
import {getPathname} from '@/src/i18n/navigation'
import {routing} from '@/src/i18n/routing'

type Href = Parameters<typeof getPathname>[0]['href']

const host =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://moccaliving.com'

const routes = [
  'experience',
  'accommodation',
  'accommodation/mocca-sea/sea-dimitra',
  'accommodation/mocca-sea/sea-georgia',
  'accommodation/mocca-city/city-dimitra',
  'contact',
  'privacy',
  'cookies',
  'rules'
]

function getUrl(href: Href, locale: Locale) {
  const pathname = getPathname({locale, href})
  return host + pathname
}

function getEntry(href: Href): MetadataRoute.Sitemap[0] {
  const {locales, defaultLocale} = routing

  return {
    url: getUrl(href, defaultLocale),
    lastModified: new Date(),
    alternates: {
      languages: {
        ...Object.fromEntries(
          locales.map((locale) => [locale, getUrl(href, locale)])
        ),
        'x-default': getUrl(href, defaultLocale)
      }
    }
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [getEntry('/'), ...routes.map((route) => getEntry(`/${route}`))]
}
