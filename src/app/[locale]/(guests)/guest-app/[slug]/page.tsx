import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import type {Locale} from 'next-intl'
import {getTranslations} from 'next-intl/server'
import {redirect} from '@/src/i18n/navigation'
import {GUEST_APP_HIDDEN} from '@/src/lib/constants'
import {getActiveGuest} from '@/src/lib/guest-app/guest-session'
import {Heading} from './(components)/heading'

type SlugParams = Promise<{
  locale: Locale
  slug: PropertySlug
}>

export async function generateMetadata({
  params
}: {
  params: SlugParams
}): Promise<Metadata> {
  const {slug} = await params
  const t = await getTranslations('Metadata')

  return {
    title: t(`guest-app.${slug}`)
  }
}

export default async function GuestAppSlugPage({
  params
}: PageProps<'/[locale]/guest-app/[slug]'>) {
  if (GUEST_APP_HIDDEN) notFound()

  const {locale, slug} = await (params as SlugParams)

  // Only a guest with an active stay at this property gets past here; a
  // guest of another property goes straight to their own
  const guest = await getActiveGuest()
  if (!guest) return redirect({href: '/guest-app', locale})
  if (guest.property !== slug) {
    return redirect({href: `/guest-app/${guest.property}`, locale})
  }

  return (
    <>
      <Heading slug={slug} />
      <p>You are in {slug} page</p>
    </>
  )
}
