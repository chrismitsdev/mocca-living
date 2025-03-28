import * as React from 'react'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {CookiesHeader} from '@/src/app/[locale]/cookies/(components)/cookies-header'
import {CookiesContent} from '@/src/app/[locale]/cookies/(components)/cookies-content'

export async function generateMetadata({params}: Params) {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'Metadata.Pages'})

  return {
    title: `${t('cookies')} | Mocca Living`
  }
}

export default function CookiesPage({params}: Params) {
  const {locale} = React.use(params)

  setRequestLocale(locale)

  return (
    <>
      <CookiesHeader />
      <CookiesContent />
    </>
  )
}
