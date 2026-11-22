import {notFound} from 'next/navigation'
import type {Locale} from 'next-intl'
import {redirect} from '@/src/i18n/navigation'
import {GUEST_APP_HIDDEN} from '@/src/lib/constants'
import {type ActiveGuest, getActiveGuest} from './guest-session'

/**
 * Gate for every page under /guests/<property>. Only a guest with an active
 * stay at this property gets past; a guest of another property goes straight
 * to the same page of their own property, anyone else to the sign-in form.
 * Each page calls it, since layouts and pages render in parallel
 */
export async function requireGuest(
  locale: Locale,
  slug: string,
  subpath = ''
): Promise<ActiveGuest> {
  if (GUEST_APP_HIDDEN) notFound()

  const guest = await getActiveGuest()
  if (!guest) return redirect({href: '/guests', locale})
  if (guest.property !== slug) {
    return redirect({href: `/guests/${guest.property}${subpath}`, locale})
  }
  return guest
}
