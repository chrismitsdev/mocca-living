import {getTranslations, setRequestLocale} from 'next-intl/server'
import {HomeHeroCarousel} from '@/components/page/home/home-hero-carousel'
import {Introduction} from '@/components/page/home/intoduction'
import {IdealReasons} from '@/components/page/home/ideal-reasons'
import {Gallery} from '@/components/page/home/gallery'

export async function generateMetadata({params: {locale}}: Params) {
  const t = await getTranslations({locale, namespace: 'Metadata.Pages'})

  return {
    title: `${t('home')} | Mocca Living`
  }
}

export default function IndexPage({params: {locale}}: Params) {
  setRequestLocale(locale)

  return (
    <>
      <HomeHeroCarousel />
      <Introduction />
      <IdealReasons />
      <Gallery />
    </>
  )
}
