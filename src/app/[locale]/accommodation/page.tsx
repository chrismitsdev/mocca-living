import * as React from 'react'
import type {Metadata} from 'next'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {AccommodationHeader} from '@/src/app/[locale]/accommodation/(components)/accommodation-header'
import {AccommodationHero} from '@/src/app/[locale]/accommodation/(components)/accommodation-hero'
import {AccommodationIntro} from '@/src/app/[locale]/accommodation/(components)/accommodation-intro'
import {AccommodationCards} from '@/src/app/[locale]/accommodation/(components)/accommodation-cards'

export async function generateMetadata({params}: Params): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.Pages.accommodation'
  })

  return {
    title: `${t('root')} | Mocca Living`
  }
}

// export default function AccommodationPage({params}: Params) {
export default function AccommodationPage({
  params
}: PageProps<'/[locale]/accommodation'>) {
  // const {locale} = React.use(params)
  const {locale} = React.use(params as Params['params'])

  setRequestLocale(locale)

  return (
    <>
      <AccommodationHeader />
      <AccommodationHero />
      <AccommodationIntro />
      <AccommodationCards />
    </>
  )
}
