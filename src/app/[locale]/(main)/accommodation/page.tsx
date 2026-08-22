import type {Metadata} from 'next'
import {getLocale, getTranslations} from 'next-intl/server'
import {buildAlternates} from '@/src/lib/utils'
import {Cards} from './(components)/cards'
import {Header} from './(components)/header'
import {Hero} from './(components)/hero'
import {Intro} from './(components)/intro'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = await getTranslations('Metadata')

  return {
    title: t('accommodation.title'),
    alternates: buildAlternates('/accommodation', locale)
  }
}

export default function AccommodationPage() {
  return (
    <>
      <Header />
      <Hero />
      <Intro />
      <Cards />
    </>
  )
}
