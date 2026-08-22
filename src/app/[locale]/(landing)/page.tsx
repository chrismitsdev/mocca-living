import type {Metadata} from 'next'
import {getLocale, getTranslations} from 'next-intl/server'
import {buildAlternates} from '@/src/lib/utils'
import {Header} from './(components)/header'
import {Selector} from './(components)/Selector'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = await getTranslations('Metadata')

  return {
    title: t('home'),
    alternates: buildAlternates('/', locale)
  }
}

export default function HomePage() {
  return (
    <>
      <Header />
      <Selector />
    </>
  )
}
