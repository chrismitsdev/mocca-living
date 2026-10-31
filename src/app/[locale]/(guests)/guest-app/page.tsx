import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import type {Locale} from 'next-intl'
import {getTranslations} from 'next-intl/server'
import {redirect} from '@/src/i18n/navigation'
import {GUEST_APP_HIDDEN} from '@/src/lib/constants'
import {getActiveGuest} from '@/src/lib/guest-app/guest-session'
import {AccessHero} from './(components)/access-hero'
import {Heading} from './(components)/heading'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata')

  return {
    title: t('guest-app.index')
  }
}

export default async function GuestAppPage({
  params
}: PageProps<'/[locale]/guest-app'>) {
  if (GUEST_APP_HIDDEN) notFound()

  const {locale} = (await params) as {locale: Locale}

  // Already verified: go straight to the guest's property
  const guest = await getActiveGuest()
  if (guest) {
    redirect({href: `/guest-app/${guest.property}`, locale})
  }

  return (
    <>
      <Heading />
      <AccessHero />
    </>
  )
}
