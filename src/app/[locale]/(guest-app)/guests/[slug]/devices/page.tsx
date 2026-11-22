import type {Metadata} from 'next'
import type {Locale} from 'next-intl'
import {getTranslations} from 'next-intl/server'
import {DeviceList} from '@/src/app/[locale]/(guest-app)/guests/[slug]/devices/(components)/device-list'
import {Heading} from '@/src/app/[locale]/(guest-app)/guests/[slug]/devices/(components)/heading'
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
    title: `${t('Pages.guest-app.sections.devices.title')} · ${t(`Metadata.guest-app.${slug}`)}`
  }
}

export default async function GuestDevicesPage({
  params
}: PageProps<'/[locale]/guests/[slug]/devices'>) {
  const {locale, slug} = await (params as SlugParams)
  await requireGuest(locale, slug, '/devices')

  return (
    <>
      <Heading slug={slug} />
      <DeviceList slug={slug} />
    </>
  )
}
