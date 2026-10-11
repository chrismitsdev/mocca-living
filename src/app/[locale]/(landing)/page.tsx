import type {Metadata} from 'next'
import {getTranslations} from 'next-intl/server'
import {Heading} from './(components)/heading'
import {HeroSelector} from './(components)/hero-selector'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata')

  return {
    title: t('home')
  }
}

export default function LandingPage() {
  return (
    <main>
      <Heading />
      <HeroSelector />
    </main>
  )
}
