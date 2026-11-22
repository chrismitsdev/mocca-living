import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import type {Locale} from 'next-intl'
import {getTranslations} from 'next-intl/server'
import {DeviceGuide} from '@/src/app/[locale]/(guest-app)/guests/[slug]/devices/[device]/(components)/device-guide'
import {Heading} from '@/src/app/[locale]/(guest-app)/guests/[slug]/devices/[device]/(components)/heading'
import type {DeviceTextKey} from '@/src/lib/guest-app/content/device-text'
import {deviceOf} from '@/src/lib/guest-app/content/devices'
import {
  type GuestAppProperty,
  isGuestAppProperty
} from '@/src/lib/guest-app/properties'
import {requireGuest} from '@/src/lib/guest-app/require-guest'

type DeviceParams = Promise<{
  locale: Locale
  slug: GuestAppProperty
  device: string
}>

export async function generateMetadata({
  params
}: {
  params: DeviceParams
}): Promise<Metadata> {
  const {slug, device} = await params
  if (!isGuestAppProperty(slug) || !deviceOf(slug, device)) return {}
  const t = await getTranslations('Pages.guest-app.device-guides')
  const tMetadata = await getTranslations('Metadata')

  return {
    title: `${t(`${slug}.${device}.name` as DeviceTextKey)} · ${tMetadata(`guest-app.${slug}`)}`
  }
}

export default async function GuestDevicePage({
  params
}: PageProps<'/[locale]/guests/[slug]/devices/[device]'>) {
  const {locale, slug, device: id} = await (params as DeviceParams)
  await requireGuest(locale, slug, `/devices/${id}`)

  const device = deviceOf(slug, id)
  if (!device) notFound()

  return (
    <>
      <Heading
        slug={slug}
        id={device.id}
        icon={device.icon}
      />
      <DeviceGuide
        slug={slug}
        device={device}
      />
    </>
  )
}
