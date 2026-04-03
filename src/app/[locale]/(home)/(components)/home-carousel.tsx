'use client'

import Autoplay from 'embla-carousel-autoplay'
import {homeCarouselImages} from '@/public/images/home/home-carousel'
import {
  ButtonNext,
  ButtonPrev,
  Carousel,
  CarouselViewport,
  Slide,
  SlidesContainer,
  Thumb,
  ThumbsContainer
} from '@/src/components/ui/carousel'
import {CustomImage} from '@/src/components/ui/custom-image'

function HomeCarousel() {
  const slides = homeCarouselImages.map((image, i) => (
    <Slide key={image.src}>
      <CustomImage
        className='min-block-96'
        src={image}
        alt={`Home page carousel image slide ${i + 1}`}
        sizes='100vw'
        quality={60}
      />
    </Slide>
  ))

  const thumbnails = homeCarouselImages.map((image, i) => (
    <Thumb
      key={image.src}
      thumbIndex={i}
    >
      <CustomImage
        src={image}
        alt={`Home page carousel image thumb ${i + 1}`}
        sizes='(min-width: 640px) 80px, 40px'
      />
    </Thumb>
  ))

  return (
    <Carousel
      className='sm:block-[calc(100svh-80px)]'
      plugins={[Autoplay()]}
    >
      <CarouselViewport>
        <SlidesContainer>{slides}</SlidesContainer>
      </CarouselViewport>
      <ButtonPrev />
      <ButtonNext />
      <ThumbsContainer>{thumbnails}</ThumbsContainer>
    </Carousel>
  )
}

HomeCarousel.displayName = 'HomeCarousel'

export {HomeCarousel}
