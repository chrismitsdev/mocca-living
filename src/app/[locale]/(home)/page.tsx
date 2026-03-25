import type {Metadata} from 'next'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {use} from 'react'
import {HomeCarousel} from './(components)/home-carousel'
import {HomeDistances} from './(components)/home-distances'
import {HomeGallery} from './(components)/home-gallery'
import {HomeHeader} from './(components)/home-header'
import {HomeIntro} from './(components)/home-intro'
import {HomeReasons} from './(components)/home-reasons'

export async function generateMetadata({params}: Params): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'Metadata.Pages'})

  return {
    title: `${t('home')} | Mocca Living`
  }
}

export default function HomePage({params}: PageProps<'/[locale]'>) {
  const {locale} = use(params as Params['params'])

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
