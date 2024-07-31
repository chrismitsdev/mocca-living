import {getTranslations} from 'next-intl/server'
import {useTranslations} from 'next-intl'
import {unstable_setRequestLocale} from 'next-intl/server'
import {Mapbox} from '@/components/page/contact/mapbox'
import {SocialCardLinks} from '@/components/page/contact/social-card-links'
import {ContactForm} from '@/components/page/contact/contact-form'
import {Container} from '@/components/shared/container'

export async function generateMetadata({params: {locale}}: Params) {
  const t = await getTranslations({locale, namespace: 'Metadata'})
 
  return {
    title: `${t('Pages.contact')} | Mocca Living`
  }
}

export default function ContactPage({params: {locale}}: Params) {
  unstable_setRequestLocale(locale)
  const t = useTranslations()

  return (
    <>
      <Container>
        <ContactForm locale={locale} />
      </Container>
      <SocialCardLinks 
        location={t('Metadata.Contact.location')}
        name={t('Metadata.Contact.name')}
        phone={t('Metadata.Contact.phone')}
      />
      <Container>
        <Mapbox 
          token={process.env.MAPBOX_TOKEN as string}
          translations={{
            title: t('Pages.Contact.ContactMap.title'),
            directions: t('Pages.Contact.ContactMap.directions')
          }}
        />
      </Container>
    </>
  )
}