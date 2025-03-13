import {defineRouting} from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['gr', 'en'],
  defaultLocale: 'en',
  localePrefix: 'always',
  localeDetection: true
})
