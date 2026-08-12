import type {Metadata} from 'next'
import {getTranslations} from 'next-intl/server'
import {HomeCarousel} from './(components)/home-carousel'
import {HomeGallery} from './(components)/home-gallery'
import {HomeHeader} from './(components)/home-header'
import {HomeIntro} from './(components)/home-intro'
import {HomeReasons} from './(components)/home-reasons'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata')

  return {
    title: t('home')
  }
}

export default function HomePage() {
  return (
    <>
      <HomeHeader />
      <HomeCarousel />
      <HomeIntro />
      <HomeReasons />
      <HomeGallery />
    </>
  )
}
