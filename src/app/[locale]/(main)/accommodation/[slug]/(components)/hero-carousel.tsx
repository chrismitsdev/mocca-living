import type {StaticImageData} from 'next/image'
import {moccaCityImages} from '@/public/images/accommodation/mocca-city'
import {moccaSeaDimitraImages} from '@/public/images/accommodation/mocca-sea-dimitra'
import {moccaSeaGeorgiaImages} from '@/public/images/accommodation/mocca-sea-georgia'
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

const images: Record<PropertySlug, StaticImageData[]> = {
  'mocca-by-the-sea-dimitra': moccaSeaDimitraImages,
  'mocca-by-the-sea-georgia': moccaSeaGeorgiaImages,
  'mocca-city': moccaCityImages
}

function HeroCarousel({slug}: {slug: PropertySlug}) {
  const slugImages = images[slug]

  const renderedSlides = slugImages.map((image, i) => (
    <Slide key={image.src}>
      <CustomImage
        className='min-block-96'
        src={image}
        alt=''
        sizes='100vw'
        quality={60}
        preload={i === 0}
      />
    </Slide>
  ))

  const renderedThumbnails = slugImages.map((image, i) => (
    <Thumb
      key={image.src}
      thumbIndex={i}
    >
      <CustomImage
        src={image}
        alt=''
        sizes='(min-width: 640px) 80px, 40px'
      />
    </Thumb>
  ))

  return (
    <Carousel className='sm:h-[calc(100svh-var(--main-header-height))]'>
      <CarouselViewport>
        <SlidesContainer>{renderedSlides}</SlidesContainer>
      </CarouselViewport>
      <ButtonPrev />
      <ButtonNext />
      <ThumbsContainer>{renderedThumbnails}</ThumbsContainer>
    </Carousel>
  )
}

export {HeroCarousel}
