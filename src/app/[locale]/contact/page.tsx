import {getTranslations, unstable_setRequestLocale} from 'next-intl/server'
import {useTranslations, useMessages, NextIntlClientProvider} from 'next-intl'
import {Container} from '@/components/shared/container'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {ContactForm} from '@/components/page/contact/contact-form'
import {Social} from '@/components/page/contact/social'
import {Map} from '@/components/page/contact/map'

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN as string

export async function generateMetadata({params: {locale}}: Params) {
  const t = await getTranslations({locale, namespace: 'Metadata'})

  return {
    title: `${t('Pages.contact')} | Mocca Living`
  }
}

export default function ContactPage({params: {locale}}: Params) {
  unstable_setRequestLocale(locale)
  const t = useTranslations()
  const messages = useMessages() as IntlMessages

  return (
    <>
      <Container className='pt-56'>
        <Card className='px-4 py-8 space-y-8 sm:p-16 w-full'>
          <CardHeader>
            <CardTitle>{t('Components.Form.contact-page-title')}</CardTitle>
            <CardDescription>
              {t('Components.Form.contact-page-description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <NextIntlClientProvider messages={messages.Components.Form}>
              <ContactForm locale={locale} />
            </NextIntlClientProvider>
          </CardContent>
        </Card>
      </Container>
      <Social
        location={t('Metadata.Contact.location')}
        name={t('Metadata.Contact.name')}
        phone={t('Metadata.Contact.phone')}
      />
      {MAPBOX_TOKEN && (
        <Container>
          <Map
            token={MAPBOX_TOKEN}
            translations={{
              title: t('Pages.Contact.Map.title'),
              directions: t('Pages.Contact.Map.directions')
            }}
          />
        </Container>
      )}
    </>
  )
}
