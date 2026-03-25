import type {Metadata} from 'next'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {use} from 'react'
import {ContactForm} from './(components)/contact-form'
import {ContactHeader} from './(components)/contact-header'
import ContactMap from './(components)/contact-map'
import {ContactSocial} from './(components)/contact-social'

export async function generateMetadata({params}: Params): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'Metadata.Pages'})

  return {
    title: `${t('contact')} | Mocca Living`
  }
}

export default function ContactPage({params}: PageProps<'/[locale]/contact'>) {
  const {locale} = use(params as Params['params'])

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
