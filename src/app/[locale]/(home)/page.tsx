import type {Metadata} from 'next'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import * as React from 'react'
import {HomeCarousel} from '@/src/app/[locale]/(home)/(components)/home-carousel'
import {HomeDistances} from '@/src/app/[locale]/(home)/(components)/home-distances'
import {HomeGallery} from '@/src/app/[locale]/(home)/(components)/home-gallery'
import {HomeHeader} from '@/src/app/[locale]/(home)/(components)/home-header'
import {HomeIntro} from '@/src/app/[locale]/(home)/(components)/home-intro'
import {HomeReasons} from '@/src/app/[locale]/(home)/(components)/home-reasons'

export async function generateMetadata({params}: Params): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'Metadata.Pages'})

  return {
    title: `${t('home')} | Mocca Living`
  }
}

export default function HomePage({params}: PageProps<'/[locale]'>) {
  const {locale} = React.use(params as Params['params'])

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
