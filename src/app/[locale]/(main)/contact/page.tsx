import type {Metadata} from 'next'
import {getLocale, getTranslations} from 'next-intl/server'
import {ViewTransition} from 'react'
import {buildAlternates} from '@/src/lib/utils'
import {Form} from './(components)/form'
import {Header} from './(components)/header'
import ContactMap from './(components)/map'
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
    <ViewTransition
      enter='page-transition'
      exit='page-transition'
      update='none'
    >
      <Header />
      <Form />
      <Social />
      <ContactMap />
    </ViewTransition>
  )
}
