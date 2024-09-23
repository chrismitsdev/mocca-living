import {getTranslations, unstable_setRequestLocale} from 'next-intl/server'
import {useTranslations} from 'next-intl'
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
  unstable_setRequestLocale(locale)
  const t = useTranslations('Pages.Home')

  return (
    <>
      <HomeHeroCarousel />
      <Introduction
        title={t('Introdution.title')}
        message={t.rich('Introdution.message', {
          nama: (chunks) => (
            <a
              className='font-semibold'
              target='_blank'
              href='https://www.tripadvisor.com/Restaurant_Review-g7715542-d24849206-Reviews-Nama_Beach_Life_Experience-Makri_Evros_Region_East_Macedonia_and_Thrace.html'
            >
              {chunks}
            </a>
          )
        })}
      />
      <IdealReasons
        title={t('IdealReasons.title')}
        reasons={{
          reason1: {
            title: t('IdealReasons.reasons.reason1.title'),
            description: t('IdealReasons.reasons.reason1.description')
          },
          reason2: {
            title: t('IdealReasons.reasons.reason2.title'),
            description: t('IdealReasons.reasons.reason2.description')
          },
          reason3: {
            title: t('IdealReasons.reasons.reason3.title'),
            description: t('IdealReasons.reasons.reason3.description')
          },
          reason4: {
            title: t('IdealReasons.reasons.reason4.title'),
            description: t('IdealReasons.reasons.reason4.description')
          },
          reason5: {
            title: t('IdealReasons.reasons.reason5.title'),
            description: t('IdealReasons.reasons.reason5.description')
          }
        }}
      />
      <Gallery />
    </>
  )
}
