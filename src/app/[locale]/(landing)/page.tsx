import type {Metadata} from 'next'
import {getTranslations} from 'next-intl/server'
import {getAlternates} from '@/src/lib/get-alternates'
import {Heading} from './(components)/heading'
import {HeroSelector} from './(components)/hero-selector'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata')

  return {
    title: t('home'),
    alternates: await getAlternates('/')
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
