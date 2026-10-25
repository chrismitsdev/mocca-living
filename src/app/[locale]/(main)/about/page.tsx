import type {Metadata} from 'next'
import {getTranslations} from 'next-intl/server'
import {getAlternates} from '@/src/lib/get-alternates'
import {Gallery} from './(components)/gallery'
import {Heading} from './(components)/heading'
import {HeroCarousel} from './(components)/hero-carousel'
import {Intro} from './(components)/intro'
import {Reasons} from './(components)/reasons'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata')

  return {
    title: t('about'),
    alternates: await getAlternates('/about')
  }
}

export default function AboutPage() {
  return (
    <>
      <Heading />
      <HeroCarousel />
      <Intro />
      <Reasons />
      <Gallery />
    </>
  )
}
