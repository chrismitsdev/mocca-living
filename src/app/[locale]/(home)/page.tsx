import * as React from 'react'
import type {Metadata} from 'next'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {HomeHeader} from '@/src/app/[locale]/(home)/(components)/home-header'
import {HomeCarousel} from '@/src/app/[locale]/(home)/(components)/home-carousel'
import {HomeIntro} from '@/src/app/[locale]/(home)/(components)/home-intro'
import {HomeReasons} from '@/src/app/[locale]/(home)/(components)/home-reasons'
import {HomeDistances} from '@/src/app/[locale]/(home)/(components)/home-distances'
import {HomeGallery} from '@/src/app/[locale]/(home)/(components)/home-gallery'

export async function generateMetadata({params}: Params): Promise<Metadata> {
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
      <HomeHeader />
      <HomeCarousel />
      <HomeIntro />
      <HomeReasons />
      <HomeDistances />
      <HomeGallery />
    </>
  )
}
