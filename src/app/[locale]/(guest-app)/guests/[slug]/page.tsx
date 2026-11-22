import type {Metadata} from 'next'
import type {Locale} from 'next-intl'
import {getTranslations} from 'next-intl/server'
import {Heading} from '@/src/app/[locale]/(guest-app)/guests/[slug]/(components)/heading'
import {SectionGrid} from '@/src/app/[locale]/(guest-app)/guests/[slug]/(components)/section-grid'
import {Welcome} from '@/src/app/[locale]/(guest-app)/guests/[slug]/(components)/welcome'
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
  const t = await getTranslations('Metadata')

  return {
    title: t(`guest-app.${slug}`)
  }
}

export default async function GuestAppSlugPage({
  params
}: PageProps<'/[locale]/guests/[slug]'>) {
  const {locale, slug} = await (params as SlugParams)
  await requireGuest(locale, slug)

  return (
    <>
      <Heading slug={slug} />
      <Welcome slug={slug} />
      <SectionGrid slug={slug} />
    </>
  )
}
