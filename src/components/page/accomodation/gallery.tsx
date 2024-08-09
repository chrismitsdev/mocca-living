import {
  LightboxProvider,
  LightboxThumbnails,
  LightboxImage,
  Lightbox
} from '@/components/ui/lightbox'
import * as indoorImages from '#/public/images/indoors'

const slides = Object.values(indoorImages)

function Gallery() {
  return (
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
      <Lightbox />
    </LightboxProvider>
  )
}

Gallery.displayName = 'Gallery'

export {Gallery}
