import * as React from 'react'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {AccommodationHero} from '@/src/app/[locale]/accommodation/(components)/accommodation-hero'
import {AccommodationIntro} from '@/src/app/[locale]/accommodation/(components)/accommodation-intro'
import {AccommodationVillas} from '@/src/app/[locale]/accommodation/(components)/accommodation-villas'

export async function generateMetadata({params}: Params) {
  const {locale} = await params
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.Pages.accommodation'
  })

  return {
    title: `${t('root')} | Mocca Living`
  }
}

export default function AccommodationPage({params}: Params) {
  const {locale} = React.use(params)

  setRequestLocale(locale)

  return (
    <>
      <AccommodationHero />
      <AccommodationIntro />
      <AccommodationVillas />
    </>
  )
}
