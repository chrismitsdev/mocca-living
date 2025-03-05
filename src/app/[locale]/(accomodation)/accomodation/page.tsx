import * as React from 'react'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {HeroImage} from '@/src/components/page/accomodation/hero-image'
import {Introduction} from '@/src/components/page/accomodation/introduction'
import {Villas} from '@/src/components/page/accomodation/villas'

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
      <HeroImage />
      <Introduction />
      <Villas />
    </>
  )
}
