'use client'

import Autoplay from 'embla-carousel-autoplay'
import * as carouselImages from '@/public/images/home/home-carousel'
import {CustomImage} from '@/src/components/ui/custom-image'
import {
  EmblaButtonNext,
  EmblaButtonPrev,
  EmblaCarousel,
  EmblaContainer,
  EmblaSlide,
  EmblaThumb,
  EmblaThumbsContainer,
  EmblaViewport
} from '@/src/components/ui/embla-carousel'
import {sortImportedImagesByName} from '@/src/lib/utils'

const images = sortImportedImagesByName(carouselImages)

const HomeCarousel: React.FC = () => {
  const slides = images.map((image, i) => (
    <EmblaSlide
      key={image.src}
      className='mr-0'
    >
      <CustomImage
        className='w-full h-full object-cover'
        src={image}
        alt={`Home page carousel image slide ${i + 1}`}
        sizes='100vw'
        quality={60}
        priority={i === 0}
      />
    </EmblaSlide>
  ))

  const thumbnails = images.map((image, i) => (
    <EmblaThumb
      key={image.src}
      thumbIndex={i}
    >
      <CustomImage
        className='w-full h-full object-cover'
        src={image}
        alt={`Home page carousel image thumb ${i + 1}`}
        sizes='(min-width: 640px) 80px, 40px'
      />
    </EmblaThumb>
  ))

  return (
    <EmblaCarousel
      className='sm:h-[calc(100svh-80px)]'
      plugins={[Autoplay({delay: 3500})]}
      asChild
    >
      <section>
        <EmblaViewport>
          <EmblaContainer>{slides}</EmblaContainer>
        </EmblaViewport>
        <EmblaButtonPrev />
        <EmblaButtonNext />
        <EmblaThumbsContainer>{thumbnails}</EmblaThumbsContainer>
      </section>
    </EmblaCarousel>
  )
}

HomeCarousel.displayName = 'HomeCarousel'

export {HomeCarousel}
