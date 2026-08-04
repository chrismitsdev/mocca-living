import type {Metadata} from 'next'
import {getTranslations} from 'next-intl/server'
import {AccommodationCards} from './(components)/accommodation-cards'
import {AccommodationHeader} from './(components)/accommodation-header'
import {AccommodationHero} from './(components)/accommodation-hero'
import {AccommodationIntro} from './(components)/accommodation-intro'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata')

  return {
    title: t('accommodation.title')
  }
}

export default async function AccommodationPage() {
  return (
    <>
      <AccommodationHeader />
      <AccommodationHero />
      <AccommodationIntro />
      <AccommodationCards />
    </>
  )
}
