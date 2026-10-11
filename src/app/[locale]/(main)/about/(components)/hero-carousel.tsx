'use client'

import Autoplay from 'embla-carousel-autoplay'
import {carouselImages} from '@/public/images/about/carousel'
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

function HeroCarousel() {
  const slides = carouselImages.map((image, i) => (
    <Slide key={image.src}>
      <CustomImage
        className='min-block-96'
        src={image}
        alt={`About page carousel image slide ${i + 1}`}
        sizes='100vw'
        quality={60}
        priority={i === 0}
      />
    </Slide>
  ))

  const thumbnails = carouselImages.map((image, i) => (
    <Thumb
      key={image.src}
      thumbIndex={i}
    >
      <CustomImage
        src={image}
        alt={`About page carousel image thumb ${i + 1}`}
        sizes='(min-width: 640px) 80px, 40px'
      />
    </Thumb>
  ))

  return (
    <Carousel
      className='sm:h-[calc(100svh-var(--main-header-height))]'
      options={{loop: true}}
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

export {HeroCarousel}
