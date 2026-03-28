import type {Metadata} from 'next'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {use} from 'react'
import {PrivacyContent} from './(components)/privacy-content'
import {PrivacyHeader} from './(components)/privacy-header'

export async function generateMetadata({params}: Params): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'Metadata.Pages'})

  return {
    title: t('privacy')
  }
}

export default function PrivacyPage({params}: PageProps<'/[locale]/privacy'>) {
  const {locale} = use(params as Params['params'])

  setRequestLocale(locale)

  return (
    <>
      <PrivacyHeader />
      <PrivacyContent />
    </>
  )
}
