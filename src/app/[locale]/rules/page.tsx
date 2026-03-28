import type {Metadata} from 'next'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {use} from 'react'
import {RulesContent} from './(components)/rules-content'
import {RulesHeader} from './(components)/rules-header'

export async function generateMetadata({params}: Params): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'Metadata.Pages'})

  return {
    title: t('rules')
  }
}

export default function RulesPage({params}: PageProps<'/[locale]/rules'>) {
  const {locale} = use(params as Params['params'])

  setRequestLocale(locale)

  return (
    <>
      <RulesHeader />
      <RulesContent />
    </>
  )
}
