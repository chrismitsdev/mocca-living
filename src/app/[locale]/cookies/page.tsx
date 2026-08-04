import type {Metadata} from 'next'
import {getTranslations} from 'next-intl/server'
import {CookiesContent} from './(components)/cookies-content'
import {CookiesHeader} from './(components)/cookies-header'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata')

  return {
    title: t('cookies')
  }
}

export default async function CookiesPage() {
  return (
    <>
      <CookiesHeader />
      <CookiesContent />
    </>
  )
}
