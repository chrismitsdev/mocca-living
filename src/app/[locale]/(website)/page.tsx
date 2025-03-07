import * as React from 'react'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {HomeHeroCarousel} from '@/src/components/page/home/home-hero-carousel'
import {Introduction} from '@/src/components/page/home/intoduction'
import {IdealReasons} from '@/src/components/page/home/ideal-reasons'
import {Gallery} from '@/src/components/page/home/gallery'

export async function generateMetadata({params}: Params) {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'Metadata.Pages'})

  return {
    title: `${t('home')} | Mocca Living`
  }
}

export default function HomePage({params}: Params) {
  const {locale} = React.use(params)

  setRequestLocale(locale)

  return (
    <>
      <HomeHeroCarousel />
      <Introduction />
      <IdealReasons />
      <Gallery />
    </>
  )
}
