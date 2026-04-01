import type {StaticImageData} from 'next/image'
import {georgiaCityImages} from '@/public/images/accommodation/city-georgia'
import {dimitraSeaImages} from '@/public/images/accommodation/sea-dimitra'
import {georgiaSeaImages} from '@/public/images/accommodation/sea-georgia'
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

const slugImages: Record<PropertySlug, StaticImageData[]> = {
  'sea-dimitra': dimitraSeaImages,
  'sea-georgia': georgiaSeaImages,
  'city-georgia': georgiaCityImages
}

function SlugCarousel({slug}: {slug: PropertySlug}) {
  const images = slugImages[slug]

  const renderedSlides = images.map((image, i) => (
    <Slide key={image.src}>
      <CustomImage
        className='min-block-96'
        src={image}
        alt={`${slug} page carousel image ${i + 1}`}
        sizes='100vw'
        quality={60}
      />
    </Slide>
  ))

  const renderedThumbnails = images.map((image, i) => (
    <Thumb
      key={image.src}
      thumbIndex={i}
    >
      <CustomImage
        src={image}
        alt={`${slug} page carousel thumb ${i + 1}`}
        sizes='(min-width: 640px) 80px, 40px'
      />
    </Thumb>
  ))

  return (
    <Carousel className='sm:h-[calc(100svh-80px)]'>
      <CarouselViewport>
        <SlidesContainer>{renderedSlides}</SlidesContainer>
      </CarouselViewport>
      <ButtonPrev />
      <ButtonNext />
      <ThumbsContainer>{renderedThumbnails}</ThumbsContainer>
    </Carousel>
  )
}

SlugCarousel.displayName = 'SlugCarousel'

export {SlugCarousel}
