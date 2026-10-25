import type {Locale} from 'next-intl'

export const IS_PRODUCTION = process.env.NODE_ENV === 'production'
export const SITE_URL = 'https://www.moccaliving.com'
export const MOCCA_SEA_GMAP = 'https://maps.app.goo.gl/UtXAvFmNtEwMjK3x9'
export const MOCCA_CITY_GMAP = 'https://maps.app.goo.gl/pLsA8svYzYq5Z9GK9'
export const HOTELO = {
  moccaSea: (locale: Locale) =>
    `https://www.hotelo.gr/${locale}/properties/mocca-living-41`,
  moccaCity: (locale: Locale) =>
    `https://www.hotelo.gr/${locale}/properties/mocca-city-51`
}
export const OWNER_PHONE = '+306973433980'
