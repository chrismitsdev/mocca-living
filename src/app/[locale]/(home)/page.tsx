import * as React from 'react'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {HomeCarousel} from '@/src/app/[locale]/(home)/(components)/home-carousel'
import {HomeIntro} from '@/src/app/[locale]/(home)/(components)/home-intro'
import {HomeReasons} from '@/src/app/[locale]/(home)/(components)/home-reasons'
import {HomeGallery} from '@/src/app/[locale]/(home)/(components)/home-gallery'

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
      <HomeCarousel />
      <HomeIntro />
      <HomeReasons />
      <HomeGallery />
    </>
  )
}
