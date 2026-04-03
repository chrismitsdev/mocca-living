import type {Metadata} from 'next'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {PrivacyContent} from './(components)/privacy-content'
import {PrivacyHeader} from './(components)/privacy-header'

export async function generateMetadata({params}: Params): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'Metadata'})

  return {
    title: t('privacy')
  }
}

export default async function PrivacyPage({
  params
}: PageProps<'/[locale]/privacy'>) {
  const {locale} = await (params as Params['params'])

  setRequestLocale(locale)

  return (
    <>
      <PrivacyHeader />
      <PrivacyContent />
    </>
  )
}
