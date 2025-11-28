import type {Metadata} from 'next'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import * as React from 'react'
import {ContactForm} from '@/src/app/[locale]/contact/(components)/contact-form'
import {ContactHeader} from '@/src/app/[locale]/contact/(components)/contact-header'
import ContactMap from '@/src/app/[locale]/contact/(components)/contact-map'
import {ContactSocial} from '@/src/app/[locale]/contact/(components)/contact-social'

export async function generateMetadata({params}: Params): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'Metadata.Pages'})

  return {
    title: `${t('contact')} | Mocca Living`
  }
}

export default function ContactPage({params}: PageProps<'/[locale]/contact'>) {
  const {locale} = React.use(params as Params['params'])

  setRequestLocale(locale)

  return (
    <>
      <ContactHeader />
      <ContactForm />
      <ContactSocial />
      <ContactMap />
    </>
  )
}
