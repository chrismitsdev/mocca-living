import * as React from 'react'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {RulesHeader} from '@/src/app/[locale]/rules/(components)/rules-header'
import {RulesContent} from '@/src/app/[locale]/rules/(components)/rules-content'

export async function generateMetadata({params}: Params) {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'Metadata.Pages'})

  return {
    title: `${t('rules')} | Mocca Living`
  }
}

export default function RulesPage({params}: Params) {
  const {locale} = React.use(params)

  setRequestLocale(locale)

  return (
    <>
      <RulesHeader />
      <RulesContent />
    </>
  )
}
