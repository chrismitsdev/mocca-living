import type {Metadata} from 'next'
import type {Locale} from 'next-intl'
import {getTranslations} from 'next-intl/server'
import {BorderWaits} from '@/src/app/[locale]/(guest-app)/guests/[slug]/border/(components)/border-waits'
import {Heading} from '@/src/app/[locale]/(guest-app)/guests/[slug]/border/(components)/heading'
import {
  type BorderDirection,
  fetchBorderWaits
} from '@/src/lib/guest-app/border'
import {
  type GuestAppProperty,
  isGuestAppProperty
} from '@/src/lib/guest-app/properties'
import {requireGuest} from '@/src/lib/guest-app/require-guest'

type SlugParams = Promise<{
  locale: Locale
  slug: GuestAppProperty
}>

// Which border opens first: Turkish and Bulgarian readers likely drive home
// that way; everyone else starts with Turkey (Kipi is the nearest crossing)
const DEFAULT_DIRECTION: Partial<Record<Locale, BorderDirection>> = {
  tr: 'turkey',
  bg: 'bulgaria'
}

export async function generateMetadata({
  params
}: {
  params: SlugParams
}): Promise<Metadata> {
  const {slug} = await params
  if (!isGuestAppProperty(slug)) return {}
  const t = await getTranslations()

  return {
    title: `${t('Pages.guest-app.sections.border.title')} · ${t(`Metadata.guest-app.${slug}`)}`
  }
}

export default async function GuestBorderPage({
  params
}: PageProps<'/[locale]/guests/[slug]/border'>) {
  const {locale, slug} = await (params as SlugParams)
  await requireGuest(locale, slug, '/border')

  const [turkey, bulgaria] = await Promise.all([
    fetchBorderWaits('turkey'),
    fetchBorderWaits('bulgaria')
  ])

  return (
    <>
      <Heading slug={slug} />
      <BorderWaits
        waits={{turkey, bulgaria}}
        defaultDirection={DEFAULT_DIRECTION[locale] ?? 'turkey'}
      />
    </>
  )
}
