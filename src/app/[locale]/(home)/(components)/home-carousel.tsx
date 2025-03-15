'use client'

import Autoplay from 'embla-carousel-autoplay'
import {sortImportedImagesByName} from '@/src/lib/utils'
import {
  EmblaCarousel,
  EmblaViewport,
  EmblaContainer,
  EmblaSlide,
  EmblaThumbsContainer,
  EmblaThumb,
  EmblaButtonPrev,
  EmblaButtonNext
} from '@/src/components/ui/embla-carousel'
import {CustomImage} from '@/src/components/ui/custom-image'
import * as slideShowImages from '@/public/images/home/home-slide-show'

const images = sortImportedImagesByName(slideShowImages)

const HomeCarousel: React.FC = () => {
  const renderedImages = images.map(function (image, i) {
    return (
      <EmblaSlide
        key={image.src}
        className='mr-0'
      >
        <CustomImage
          className='w-full h-full object-cover'
          src={image}
          alt={`Home page carousel image slide ${i + 1}`}
          priority
        />
      </EmblaSlide>
    )
  })

  const renderedThumbs = images.map(function (image, i) {
    return (
      <EmblaThumb
        key={image.src}
        thumbIndex={i}
      >
        <CustomImage
          className='w-full h-full object-cover'
          src={image}
          alt={`Home page carousel image thumb ${i + 1}`}
        />
      </EmblaThumb>
    )
  })

  return (
    <EmblaCarousel
      className='sm:h-[calc(100svh-80px)]'
      plugins={[Autoplay({delay: 3500})]}
      asChild
    >
      <section>
        <EmblaViewport>
          <EmblaContainer>{renderedImages}</EmblaContainer>
        </EmblaViewport>
        <EmblaButtonPrev />
        <EmblaButtonNext />
        <EmblaThumbsContainer>{renderedThumbs}</EmblaThumbsContainer>
      </section>
    </EmblaCarousel>
  )
}

HomeCarousel.displayName = 'HomeCarousel'

export {HomeCarousel}
