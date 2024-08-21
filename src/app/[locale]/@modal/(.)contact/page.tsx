import {useTranslations} from 'next-intl'
import {unstable_setRequestLocale} from 'next-intl/server'
import {Form} from '@/components/page/contact/form'
import {InterceptorModal} from '@/components/shared/interceptor-modal'

export default function ContactPage({params: {locale}}: Params) {
  unstable_setRequestLocale(locale)
  const t = useTranslations()

  return (
    <InterceptorModal>
      <Form
        wrapperClassName='flex flex-col gap-2'
        buttonWrapperClassName='flex justify-between'
        locale={locale}
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
              whitelistedProviders: t('Pages.Contact.Form.fields.email.validation.whitelistedProviders')
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
          villa: {
            label: t('Pages.Contact.Form.fields.villa.label'),
            placeholder: t('Pages.Contact.Form.fields.villa.placeholder'),
            validation: {
              required: t('Pages.Contact.Form.fields.villa.validation.required')
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
        submitBtnLabel={t('Pages.Contact.Form.submit-btn')}
        resetBtnLabel={t('Pages.Contact.Form.reset-btn')}
      />
    </InterceptorModal>
  )
}
