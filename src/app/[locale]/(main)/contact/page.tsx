import type {Metadata} from 'next'
import {getTranslations} from 'next-intl/server'
import {Form} from './(components)/form'
import {Heading} from './(components)/heading'
import ContactMap from './(components)/map'
import {SocialLinks} from './(components)/social-links'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata')

  return {
    title: t('contact')
  }
}

export default function ContactPage() {
  return (
    <>
      <Heading />
      <Form />
      <SocialLinks />
      <ContactMap />
    </>
  )
}
