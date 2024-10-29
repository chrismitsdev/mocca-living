import {defineRouting, type LocalePrefix} from 'next-intl/routing'
import {createNavigation} from 'next-intl/navigation'

export const locales = ['gr', 'en'] as const
export const defaultLocale = 'en' as const
export const localePrefix = 'always' satisfies LocalePrefix

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix,
  localeDetection: true
})

export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing)
