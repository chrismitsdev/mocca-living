import type {Metadata} from 'next'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {CookiesContent} from './(components)/cookies-content'
import {CookiesHeader} from './(components)/cookies-header'

export async function generateMetadata({params}: Params): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'Metadata'})

  return {
    title: t('cookies')
  }
}

export default async function CookiesPage({
  params
}: PageProps<'/[locale]/cookies'>) {
  const {locale} = await (params as Params['params'])

  setRequestLocale(locale)

  return (
    <>
      <CookiesHeader />
      <CookiesContent />
    </>
  )
}
