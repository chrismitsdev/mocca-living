import type {MetadataRoute} from 'next'
import type {Locale} from 'next-intl'
import {Metadata as TranslationsMetadata} from '@/messages/en.json'
import {getPathname} from '@/src/i18n/navigation'
import {routing} from '@/src/i18n/routing'
import {IS_PRODUCTION} from '@/src/lib/constants'

type Href = Parameters<typeof getPathname>[0]['href']

const host = IS_PRODUCTION ? 'https://moccaliving.com' : 'http://localhost:3000'

// Same source as generateStaticParams in accommodation/[slug]
const accommodationRoutes = Object.keys(
  TranslationsMetadata.accommodation.slug
).map((slug) => `accommodation/${slug}`)

const routes = [
  'about',
  'accommodation',
  ...accommodationRoutes,
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

export default function sitemap(): MetadataRoute.Sitemap {
  return [getEntry('/'), ...routes.map((route) => getEntry(`/${route}`))]
}
