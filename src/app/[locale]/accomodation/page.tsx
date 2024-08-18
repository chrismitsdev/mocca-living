import {getTranslations} from 'next-intl/server'
import {useTranslations} from 'next-intl'
import {unstable_setRequestLocale} from 'next-intl/server'
import {HeroImage} from '@/components/page/accomodation/hero-image'
import {Introduction} from '@/components/page/accomodation/introduction'
import {Villas} from '@/components/page/accomodation/villas'

export async function generateMetadata({params: {locale}}: Params) {
  const t = await getTranslations({locale, namespace: 'Metadata'})

  return {
    title: `${t('Pages.accomodation.root')} | Mocca Living`
  }
}

export default function AccomodationPage({params: {locale}}: Params) {
  unstable_setRequestLocale(locale)
  const t = useTranslations('Pages.Accomodation')

  return (
    <>
      <HeroImage />
      <Introduction
        translations={{
          title: t('Introdution.title'),
          message: t('Introdution.message')
        }}
      />
      <Villas />
    </>
  )
}
