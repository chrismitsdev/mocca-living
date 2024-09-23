import {defineRouting, type LocalePrefix} from 'next-intl/routing'
import {createSharedPathnamesNavigation} from 'next-intl/navigation'

export const locales = ['gr', 'en'] as const
export const defaultLocale = 'gr' as const
export const localePrefix = 'always' satisfies LocalePrefix

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix
})

export const {Link, redirect, usePathname, useRouter} =
  createSharedPathnamesNavigation(routing)
