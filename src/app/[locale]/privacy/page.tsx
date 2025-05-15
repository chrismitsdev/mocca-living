import * as React from 'react'
import type {Metadata} from 'next'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {PrivacyHeader} from '@/src/app/[locale]/privacy/(components)/privacy-header'
import {PrivacyContent} from '@/src/app/[locale]/privacy/(components)/privacy-content'

export async function generateMetadata({params}: Params): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'Metadata.Pages'})

  return {
    title: `${t('privacy')} | Mocca Living`
  }
}

export default function PrivacyPage({params}: Params) {
  const {locale} = React.use(params)

  setRequestLocale(locale)

  return (
    <>
      <PrivacyHeader />
      <PrivacyContent />
    </>
  )
}
