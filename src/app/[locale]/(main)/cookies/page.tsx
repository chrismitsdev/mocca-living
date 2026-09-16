import type {Metadata} from 'next'
import {getTranslations} from 'next-intl/server'
import {Content} from './(components)/content'
import {Heading} from './(components)/heading'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata')

  return {
    title: t('cookies')
  }
}

export default function CookiesPage() {
  return (
    <>
      <Heading />
      <Content />
    </>
  )
}
