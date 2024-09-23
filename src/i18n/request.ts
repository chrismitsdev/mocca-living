import {getRequestConfig} from 'next-intl/server'
import {notFound} from 'next/navigation'
import {locales} from '@/i18n/routing'

export default getRequestConfig(async function ({locale}) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as (typeof locales)[number])) notFound()

  return {
    messages: (await import(`../../messages/${locale}.json`)).default
  }
})
