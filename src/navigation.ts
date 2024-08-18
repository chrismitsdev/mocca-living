import {createSharedPathnamesNavigation} from 'next-intl/navigation'
import {locales, localePrefix} from '#/lib/next-intl-config'

export const {Link, redirect, usePathname, useRouter} = createSharedPathnamesNavigation({
  locales,
  localePrefix
})
