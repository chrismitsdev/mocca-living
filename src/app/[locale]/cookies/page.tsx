import * as React from 'react'
import type {Metadata} from 'next'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {CookiesHeader} from '@/src/app/[locale]/cookies/(components)/cookies-header'
import {CookiesContent} from '@/src/app/[locale]/cookies/(components)/cookies-content'

export async function generateMetadata({params}: Params): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'Metadata.Pages'})

  return {
    title: `${t('cookies')} | Mocca Living`
  }
}

export default function CookiesPage({params}: PageProps<'/[locale]/cookies'>) {
  const {locale} = React.use(params as Params['params'])

  setRequestLocale(locale)

  return (
    <>
      <CookiesHeader />
      <CookiesContent />
    </>
  )
}
