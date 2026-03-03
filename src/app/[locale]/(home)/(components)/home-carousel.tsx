'use client'

import Autoplay from 'embla-carousel-autoplay'
import * as carouselImages from '@/public/images/home/home-carousel'
import {
  ButtonNext,
  ButtonPrev,
  Carousel,
  Slide,
  SlidesContainer,
  Thumb,
  ThumbsContainer,
  Viewport
} from '@/src/components/ui/carousel'
import {CustomImage} from '@/src/components/ui/custom-image'
import {sortImportedImagesByName} from '@/src/lib/utils'

const images = sortImportedImagesByName(carouselImages)

function HomeCarousel() {
  const slides = images.map((image, i) => (
    <Slide
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
    </Slide>
  ))

  const thumbnails = images.map((image, i) => (
    <Thumb
      key={image.src}
      thumbIndex={i}
    >
      <CustomImage
        className='w-full h-full object-cover'
        src={image}
        alt={`Home page carousel image thumb ${i + 1}`}
        sizes='(min-width: 640px) 80px, 40px'
      />
    </Thumb>
  ))

  return (
    <Carousel
      className='sm:h-[calc(100svh-80px)]'
      plugins={[Autoplay({delay: 3500})]}
      asChild
    >
      <section>
        <Viewport>
          <SlidesContainer>{slides}</SlidesContainer>
        </Viewport>
        <ButtonPrev />
        <ButtonNext />
        <ThumbsContainer>{thumbnails}</ThumbsContainer>
      </section>
    </Carousel>
  )
}

HomeCarousel.displayName = 'HomeCarousel'

export {HomeCarousel}
