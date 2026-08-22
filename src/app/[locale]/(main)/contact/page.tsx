import type {Metadata} from 'next'
import {getLocale, getTranslations} from 'next-intl/server'
import {buildAlternates} from '@/src/lib/utils'
import ContactMap from './(components)/contact-map'
import {Form} from './(components)/form'
import {Header} from './(components)/header'
import {Social} from './(components)/social'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = await getTranslations('Metadata')

  return {
    title: t('contact'),
    alternates: buildAlternates('/contact', locale)
  }
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <Form />
      <Social />
      <ContactMap />
    </>
  )
}
