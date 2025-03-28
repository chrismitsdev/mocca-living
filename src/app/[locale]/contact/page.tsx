import * as React from 'react'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {ContactHeader} from '@/src/app/[locale]/contact/(components)/contact-header'
import {ContactForm} from '@/src/app/[locale]/contact/(components)/contact-form'
import {ContactSocial} from '@/src/app/[locale]/contact/(components)/contact-social'
import ContactMap from '@/src/app/[locale]/contact/(components)/contact-map'

export async function generateMetadata({params}: Params) {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'Metadata.Pages'})

  return {
    title: `${t('contact')} | Mocca Living`
  }
}

export default function ContactPage({params}: Params) {
  const {locale} = React.use(params)

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
