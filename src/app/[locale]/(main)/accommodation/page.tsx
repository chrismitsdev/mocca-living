import type {Metadata} from 'next'
import {getTranslations} from 'next-intl/server'
import {getAlternates} from '@/src/lib/get-alternates'
import {Cards} from './(components)/cards'
import {Heading} from './(components)/heading'
import {Hero} from './(components)/hero'
import {Intro} from './(components)/intro'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata')

  return {
    title: t('accommodation.index'),
    alternates: await getAlternates('/accommodation')
  }
}

export default function AccommodationPage() {
  return (
    <>
      <Heading />
      <Hero />
      <Intro />
      <Cards />
    </>
  )
}
