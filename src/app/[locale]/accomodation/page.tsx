import * as React from 'react'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {AccomodationHero} from '@/src/app/[locale]/accomodation/(components)/accomodation-hero'
import {AccomodationIntro} from '@/src/app/[locale]/accomodation/(components)/accomodation-intro'
import {AccomodationVillas} from '@/src/app/[locale]/accomodation/(components)/accomodation-villas'

export async function generateMetadata({params}: Params) {
  const {locale} = await params
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.Pages.accomodation'
  })

  return {
    title: `${t('root')} | Mocca Living`
  }
}

export default function AccomodationPage({params}: Params) {
  const {locale} = React.use(params)

  setRequestLocale(locale)

  return (
    <>
      <AccomodationHero />
      <AccomodationIntro />
      <AccomodationVillas />
    </>
  )
}
