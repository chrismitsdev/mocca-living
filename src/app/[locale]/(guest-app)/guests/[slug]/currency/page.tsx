import type {Metadata} from 'next'
import type {Locale} from 'next-intl'
import {getTranslations} from 'next-intl/server'
import {CurrencyConverter} from '@/src/app/[locale]/(guest-app)/guests/[slug]/currency/(components)/currency-converter'
import {Heading} from '@/src/app/[locale]/(guest-app)/guests/[slug]/currency/(components)/heading'
import {fetchRates} from '@/src/lib/guest-app/currency'
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
    title: `${t('Pages.guest-app.sections.currency.title')} · ${t(`Metadata.guest-app.${slug}`)}`
  }
}

export default async function GuestCurrencyPage({
  params
}: PageProps<'/[locale]/guests/[slug]/currency'>) {
  const {locale, slug} = await (params as SlugParams)
  await requireGuest(locale, slug, '/currency')

  return (
    <>
      <Heading slug={slug} />
      <CurrencyConverter rates={await fetchRates()} />
    </>
  )
}
