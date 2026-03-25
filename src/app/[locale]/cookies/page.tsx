import type {Metadata} from 'next'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {use} from 'react'
import {CookiesContent} from './(components)/cookies-content'
import {CookiesHeader} from './(components)/cookies-header'

export async function generateMetadata({params}: Params): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'Metadata.Pages'})

  return {
    title: `${t('cookies')} | Mocca Living`
  }
}

export default function CookiesPage({params}: PageProps<'/[locale]/cookies'>) {
  const {locale} = use(params as Params['params'])

  setRequestLocale(locale)

  return (
    <>
      <CookiesHeader />
      <CookiesContent />
    </>
  )
}
