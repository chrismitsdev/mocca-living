import {getTranslations, unstable_setRequestLocale} from 'next-intl/server'
import {HeroImage} from '@/components/page/accomodation/hero-image'
import {Introduction} from '@/components/page/accomodation/introduction'
import {Villas} from '@/components/page/accomodation/villas'
// import {Faq} from '@/components/page/accomodation/faq'
import {MusicPlayer} from '@/components/page/accomodation/music-player'
import playlist from '#/public/music/data.json'

export async function generateMetadata({params: {locale}}: Params) {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.Pages.accomodation'
  })

  return {
    title: `${t('root')} | Mocca Living`
  }
}

export default function AccomodationPage({params: {locale}}: Params) {
  unstable_setRequestLocale(locale)

  return (
    <>
      <HeroImage />
      <Introduction />
      <Villas />
      {/* <Faq /> */}
      <MusicPlayer playlist={playlist} />
    </>
  )
}
