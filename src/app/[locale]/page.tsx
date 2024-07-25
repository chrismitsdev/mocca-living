import {getTranslations} from 'next-intl/server'
import {useTranslations} from 'next-intl'
import {unstable_setRequestLocale} from 'next-intl/server'
import {HomeCarousel} from '@/components/page/home/HomeCarousel'

export async function generateMetadata({params: {locale}}: Params) {
  const t = await getTranslations({locale, namespace: 'Metadata'})
 
  return {
    title: `${t('Pages.home')} | Mocca Living`
  }
}

export default function IndexPage({params: {locale}}: Params) {
  unstable_setRequestLocale(locale)
  const t = useTranslations('Pages.Home')

  return (
    <section>
      <HomeCarousel />
    </section>
  )
}
