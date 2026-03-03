import * as dimitraImages from '@/public/images/accommodation/slug/dimitra'
import * as georgiaImages from '@/public/images/accommodation/slug/georgia'
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

const slugImages = {
  georgia: sortImportedImagesByName(georgiaImages),
  dimitra: sortImportedImagesByName(dimitraImages)
}

function SlugCarousel({slug}: {slug: Slug}) {
  const images = slugImages[slug]

  const slides = images.map((image, i) => (
    <Slide
      key={image.src}
      className='mr-0'
    >
      <CustomImage
        className='w-full h-full object-cover'
        src={image}
        alt={`${slug} page carousel image ${i + 1}`}
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
        alt={`${slug} page carousel thumb ${i + 1}`}
        sizes='(min-width: 640px) 80px, 40px'
      />
    </Thumb>
  ))

  return (
    <Carousel
      className='sm:h-[calc(100svh-80px)]'
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

SlugCarousel.displayName = 'SlugCarousel'

export {SlugCarousel}
