import type {Metadata} from 'next'
import {getTranslations} from 'next-intl/server'
import {ContactForm} from './(components)/contact-form'
import {ContactHeader} from './(components)/contact-header'
import ContactMap from './(components)/contact-map'
import {ContactSocial} from './(components)/contact-social'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata')

  return {
    title: t('contact')
  }
}

export default async function ContactPage() {
  return (
    <>
      <ContactHeader />
      <ContactForm />
      <ContactSocial />
      <ContactMap />
    </>
  )
}
