import {
  CarouselProvider,
  CarouselRoot,
  CarouselViewport,
  CarouselImageContainer,
  CarouselImage,
  CarouselPrevButton,
  CarouselNextButton,
  CarouselThumbnailViewport,
  CarouselThumbnailContainer,
  CarouselThumbnailButton,
  CarouselThumbnailImage
} from '@/components/ui/carousel'
import * as outdoorImages from '#/public/images/outdoor'

const images = Object.values(outdoorImages).slice(0, 8)

function HomeHeroCarousel() {
  return (
    <CarouselProvider images={images}>
      <CarouselRoot className='max-w-full'>
        <CarouselViewport className='h-full'>
          <CarouselImageContainer className='h-full'>
            {images.map((image, i) => (
              <CarouselImage
                key={image.src}
                index={i}
                src={image}
                alt={`Home page carousel image ${i + 1}`}
                priority
              />
            ))}
          </CarouselImageContainer>
          <CarouselPrevButton size='icon-small' />
          <CarouselNextButton size='icon-small' />
        </CarouselViewport>
        <CarouselThumbnailViewport className='hidden sm:flex'>
          <CarouselThumbnailContainer>
            {images.map((image, i) => (
              <CarouselThumbnailButton
                key={image.src}
                index={i}
              >
                <CarouselThumbnailImage
                  src={image}
                  alt={`Carousel thumbnail iamge ${i + 1}`}
                />
              </CarouselThumbnailButton>
            ))}
          </CarouselThumbnailContainer>
        </CarouselThumbnailViewport>
      </CarouselRoot>
    </CarouselProvider>
  )
}

HomeHeroCarousel.displayName = 'HomeHeroCarousel'

export {HomeHeroCarousel}
