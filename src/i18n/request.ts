import {getRequestConfig} from 'next-intl/server'
import {routing} from '@/src/i18n/routing'

export default getRequestConfig(async function ({requestLocale}) {
  let locale = (await requestLocale) as Locale

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  }
})
