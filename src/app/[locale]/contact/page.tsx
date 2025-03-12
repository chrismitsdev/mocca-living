import * as React from 'react'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {useTranslations, useMessages, NextIntlClientProvider} from 'next-intl'
import {Container} from '@/src/components/shared/container'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/src/components/ui/card'
import {ContactForm} from '@/src/app/[locale]/contact/(components)/contact-form'
import {ContactSocial} from '@/src/app/[locale]/contact/(components)/contact-social'
import {ContactMap} from '@/src/app/[locale]/contact/(components)/contact-map'

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
  const t = useTranslations()
  const messages = useMessages() as IntlMessages
  const scopedMessages = {
    ...messages.Components.Form,
    ...messages.Metadata.Pages,
    ...messages.Pages.Privacy
  }

  return (
    <>
      <Container
        className='pt-56'
        asChild
      >
        <section>
          <Card className='px-4 py-8 space-y-8 sm:p-16 w-full'>
            <CardHeader>
              <CardTitle>{t('Components.Form.contact-page-title')}</CardTitle>
              <CardDescription>
                {t('Components.Form.contact-page-description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NextIntlClientProvider messages={scopedMessages}>
                <ContactForm locale={locale} />
              </NextIntlClientProvider>
            </CardContent>
          </Card>
        </section>
      </Container>

      <ContactSocial />

      {process.env.MAPBOX_TOKEN && (
        <Container asChild>
          <section>
            <ContactMap
              token={process.env.MAPBOX_TOKEN}
              translations={{
                title: t('Pages.Contact.Map.title'),
                directions: t('Pages.Contact.Map.directions')
              }}
            />
          </section>
        </Container>
      )}
    </>
  )
}
