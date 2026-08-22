import type {Metadata} from 'next'
import {getLocale, getTranslations} from 'next-intl/server'
import {buildAlternates} from '@/src/lib/utils'
import {Gallery} from './(components)/gallery'
import {Header} from './(components)/header'
import {HeroCarousel} from './(components)/hero-carousel'
import {Intro} from './(components)/intro'
import {Reasons} from './(components)/reasons'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = await getTranslations('Metadata')

  return {
    title: t('experience'),
    alternates: buildAlternates('/experience', locale)
  }
}

export default function ExperiencePage() {
  return (
    <>
      <Header />
      <HeroCarousel />
      <Intro />
      <Reasons />
      <Gallery />
    </>
  )
}
