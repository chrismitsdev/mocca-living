import type {Metadata} from 'next'
import type {Locale} from 'next-intl'
import {getTranslations} from 'next-intl/server'
import {CheckOutDetails} from '@/src/app/[locale]/(guest-app)/guests/[slug]/check-out/(components)/check-out-details'
import {Heading} from '@/src/app/[locale]/(guest-app)/guests/[slug]/check-out/(components)/heading'
import {
  type GuestAppProperty,
  isGuestAppProperty
} from '@/src/lib/guest-app/properties'
import {requireGuest} from '@/src/lib/guest-app/require-guest'

type SlugParams = Promise<{
  locale: Locale
  slug: GuestAppProperty
}>

export async function generateMetadata({
  params
}: {
  params: SlugParams
}): Promise<Metadata> {
  const {slug} = await params
  if (!isGuestAppProperty(slug)) return {}
  const t = await getTranslations()

  return {
    title: `${t('Pages.guest-app.sections.check-out.title')} · ${t(`Metadata.guest-app.${slug}`)}`
  }
}

export default async function GuestCheckOutPage({
  params
}: PageProps<'/[locale]/guests/[slug]/check-out'>) {
  const {locale, slug} = await (params as SlugParams)
  const guest = await requireGuest(locale, slug, '/check-out')

  return (
    <>
      <Heading slug={slug} />
      <CheckOutDetails reservation={guest.reservation} />
    </>
  )
}
