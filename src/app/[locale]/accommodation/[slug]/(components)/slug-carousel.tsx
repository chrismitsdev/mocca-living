import {dimitraCarouselImages} from '@/public/images/accommodation/slug/dimitra'
import {georgiaCarouselImages} from '@/public/images/accommodation/slug/georgia'
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

const slugImages = {
  georgia: georgiaCarouselImages,
  dimitra: dimitraCarouselImages
}

function SlugCarousel({slug}: {slug: Slug}) {
  const images = slugImages[slug]

  const slides = images.map((image, i) => (
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

  const thumbnails = images.map((image, i) => (
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
        <SlidesContainer>{slides}</SlidesContainer>
      </CarouselViewport>
      <ButtonPrev />
      <ButtonNext />
      <ThumbsContainer>{thumbnails}</ThumbsContainer>
    </Carousel>
  )
}

SlugCarousel.displayName = 'SlugCarousel'

export {SlugCarousel}
