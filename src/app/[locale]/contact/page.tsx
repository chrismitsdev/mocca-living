import {getTranslations} from 'next-intl/server'
import {useTranslations} from 'next-intl'
import {unstable_setRequestLocale} from 'next-intl/server'
import {Mapbox} from '@/components/page/contact/mapbox'
import {SocialLinkCards} from '@/components/page/contact/social-link-cards'
import {ContactForm} from '@/components/page/contact/contact-form'
import {Container} from '@/components/shared/container'

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

  return (
    <>
      <Container className='pt-56'>
        <ContactForm
          locale={locale}
          formTitle={t('Pages.Contact.Form.title')}
          formDescription={t('Pages.Contact.Form.description')}
          submitBtnLabel={t('Pages.Contact.Form.submit-btn')}
          resetBtnLabel={t('Pages.Contact.Form.reset-btn')}
          fieldTranslations={{
            name: {
              label: t('Pages.Contact.Form.fields.name.label'),
              placeholder: t('Pages.Contact.Form.fields.name.placeholder'),
              validation: {
                required: t('Pages.Contact.Form.fields.name.validation.required'),
                length: t('Pages.Contact.Form.fields.name.validation.length')
              }
            },
            email: {
              label: t('Pages.Contact.Form.fields.email.label'),
              placeholder: t('Pages.Contact.Form.fields.email.placeholder'),
              validation: {
                required: t('Pages.Contact.Form.fields.email.validation.required'),
                pattern: t('Pages.Contact.Form.fields.email.validation.pattern'),
                whitelistedProviders: t(
                  'Pages.Contact.Form.fields.email.validation.whitelistedProviders'
                )
              }
            },
            phone: {
              label: t('Pages.Contact.Form.fields.phone.label'),
              placeholder: t('Pages.Contact.Form.fields.phone.placeholder'),
              validation: {
                required: t('Pages.Contact.Form.fields.phone.validation.required'),
                pattern: t('Pages.Contact.Form.fields.phone.validation.pattern')
              }
            },
            checkIn: {
              label: t('Pages.Contact.Form.fields.checkIn.label'),
              placeholder: t('Pages.Contact.Form.fields.checkIn.placeholder'),
              validation: {
                required: t('Pages.Contact.Form.fields.checkIn.validation.required')
              }
            },
            checkOut: {
              label: t('Pages.Contact.Form.fields.checkOut.label'),
              placeholder: t('Pages.Contact.Form.fields.checkOut.placeholder'),
              validation: {
                required: t('Pages.Contact.Form.fields.checkOut.validation.required')
              }
            },
            suite: {
              label: t('Pages.Contact.Form.fields.suite.label'),
              placeholder: t('Pages.Contact.Form.fields.suite.placeholder'),
              validation: {
                required: t('Pages.Contact.Form.fields.suite.validation.required')
              }
            },
            message: {
              label: t('Pages.Contact.Form.fields.message.label'),
              placeholder: t('Pages.Contact.Form.fields.message.placeholder')
            },
            consentData: {
              label: t('Pages.Contact.Form.fields.consentData.label'),
              validation: {
                required: t('Pages.Contact.Form.fields.consentData.validation.required')
              }
            }
          }}
        />
      </Container>
      <SocialLinkCards
        location={t('Metadata.Contact.location')}
        name={t('Metadata.Contact.name')}
        phone={t('Metadata.Contact.phone')}
      />
      {MAPBOX_TOKEN && (
        <Container>
          <Mapbox
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
