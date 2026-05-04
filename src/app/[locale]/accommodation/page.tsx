import type {Metadata} from 'next'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {AccommodationCards} from './(components)/accommodation-cards'
import {AccommodationHeader} from './(components)/accommodation-header'
import {AccommodationHero} from './(components)/accommodation-hero'
import {AccommodationIntro} from './(components)/accommodation-intro'

export async function generateMetadata({params}: Params): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'Metadata'})

  return {
    title: t('accommodation.title')
  }
}

export default async function AccommodationPage({
  params
}: PageProps<'/[locale]/accommodation'>) {
  const {locale} = await (params as Params['params'])

  setRequestLocale(locale)

  return (
    <>
      <AccommodationHeader />
      <AccommodationHero />
      <AccommodationIntro />
      <AccommodationCards />
    </>
  )
}
