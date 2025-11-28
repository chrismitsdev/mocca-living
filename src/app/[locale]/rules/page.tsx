import type {Metadata} from 'next'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import * as React from 'react'
import {RulesContent} from '@/src/app/[locale]/rules/(components)/rules-content'
import {RulesHeader} from '@/src/app/[locale]/rules/(components)/rules-header'

export async function generateMetadata({params}: Params): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'Metadata.Pages'})

  return {
    title: `${t('rules')} | Mocca Living`
  }
}

export default function RulesPage({params}: PageProps<'/[locale]/rules'>) {
  const {locale} = React.use(params as Params['params'])

  setRequestLocale(locale)

  return (
    <>
      <RulesHeader />
      <RulesContent />
    </>
  )
}
