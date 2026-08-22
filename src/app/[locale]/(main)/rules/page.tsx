import type {Metadata} from 'next'
import {getLocale, getTranslations} from 'next-intl/server'
import {buildAlternates} from '@/src/lib/utils'
import {Content} from './(components)/content'
import {Header} from './(components)/header'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = await getTranslations('Metadata')

  return {
    title: t('rules'),
    alternates: buildAlternates('/rules', locale)
  }
}

export default function RulesPage() {
  return (
    <>
      <Header />
      <Content />
    </>
  )
}
