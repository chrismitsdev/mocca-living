import {
  CarouselProvider,
  CarouselRoot,
  CarouselViewport,
  CarouselImageContainer,
  CarouselImage,
  CarouselPrevButton,
  CarouselNextButton
} from '@/components/ui/carousel'
import * as georgiaImages from '#/public/images/georgia'
import * as dimitraImages from '#/public/images/dimitra'

type SlugCarouselProps = {
  slug: Slug
}

const slugImages = {
  georgia: Object.values(georgiaImages),
  dimitra: Object.values(dimitraImages)
}

function SlugCarousel({slug}: SlugCarouselProps) {
  const images = slugImages[slug]

  return (
    <CarouselProvider images={images}>
      <CarouselRoot className='max-w-full'>
        <CarouselViewport className='h-full'>
          <CarouselImageContainer className='h-full'>
            {images.map((image, i) => (
              <CarouselImage
                key={image.blurDataURL}
                index={i}
                src={image}
                alt='Image'
              />
            ))}
          </CarouselImageContainer>
          <CarouselPrevButton size='icon-small' />
          <CarouselNextButton size='icon-small' />
        </CarouselViewport>
      </CarouselRoot>
    </CarouselProvider>
  )
}

SlugCarousel.displayName = 'SlugCarousel'

export {SlugCarousel}
