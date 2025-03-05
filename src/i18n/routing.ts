import {defineRouting, type LocalePrefix} from 'next-intl/routing'

export const locales = ['gr', 'en'] as const
const defaultLocale = 'en' as const
const localePrefix = 'always' satisfies LocalePrefix

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix,
  localeDetection: true
})
