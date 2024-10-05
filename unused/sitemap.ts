import {MetadataRoute} from 'next'
import {defaultLocale, locales} from '@/i18n/routing'

const host = 'https://moccaliving.gr'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    getEntry('/'),
    getEntry('/accomodation'),
    getEntry('/accomodation/georgia'),
    getEntry('/accomodation/dimitra'),
    getEntry('/contact'),
    getEntry('/privacy'),
    getEntry('/cookies')
  ]
}

function getEntry(pathname: string): MetadataRoute.Sitemap[0] {
  return {
    url: getUrl(pathname, defaultLocale),
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        locales.map((locale) => [locale, getUrl(pathname, locale)])
      )
    }
  }
}

function getUrl(pathname: string, locale: string) {
  return `${host}/${locale}${pathname === '/' ? '' : pathname}`
}
