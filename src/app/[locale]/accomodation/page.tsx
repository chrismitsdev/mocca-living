import {getTranslations} from 'next-intl/server'
import {useTranslations} from 'next-intl'
import {unstable_setRequestLocale} from 'next-intl/server'
import {Container} from '@/components/shared/container'
import {
  LightboxProvider,
  LightboxThumbnails,
  LightboxImage,
  Lightbox
} from '@/components/ui/lightbox'
import * as indoorImages from '#/public/images/indoors'

const slides = Object.values(indoorImages)

export async function generateMetadata({params: {locale}}: Params) {
  const t = await getTranslations({locale, namespace: 'Metadata'})

  return {
    title: `${t('Pages.accomodation')} | Mocca Living`
  }
}

export default function AccomodationPage({params: {locale}}: Params) {
  unstable_setRequestLocale(locale)
  const t = useTranslations('Pages.Accomodation')

  return (
    <Container>
      <LightboxProvider slides={slides}>
        <LightboxThumbnails>
          {slides.map((slide) => (
            <LightboxImage
              className='overflow-hidden rounded cursor-pointer'
              key={slide.src}
              slide={slide}
              imageProps={{loading: 'lazy', alt: 'Thumbnail image'}}
              withOverlay
            />
          ))}
        </LightboxThumbnails>
        <Lightbox controller={{closeOnBackdropClick: false}} />
      </LightboxProvider>
    </Container>
  )
}
