import {
  EmblaCarousel,
  EmblaViewport,
  EmblaContainer,
  EmblaSlide,
  EmblaThumbsContainer,
  EmblaThumb,
  EmblaButtonPrev,
  EmblaButtonNext
} from '@/src/components/ui/embla-carousel'
import {CustomImage} from '@/src/components/ui/custom-image'
import {sortImportedImagesByName} from '@/src/lib/utils'
import * as slideShowImages from '@/public/images/home/home-slide-show'

const images = sortImportedImagesByName(slideShowImages)

const HomeHeroCarousel: React.FC = () => {
  const renderedImages = images.map(function (image, i) {
    return (
      <EmblaSlide
        key={image.src}
        className='mr-0'
      >
        <CustomImage
          className='w-full h-full object-cover'
          src={image}
          alt={`Home page carousel image slide ${i + 1}`}
          priority
          draggable={false}
        />
      </EmblaSlide>
    )
  })

  const renderedThumbs = images.map(function (image, i) {
    return (
      <EmblaThumb
        key={image.src}
        thumbIndex={i}
      >
        <CustomImage
          className='w-full h-full object-cover'
          src={image}
          alt={`Home page carousel image thumb ${i + 1}`}
          draggable={false}
        />
      </EmblaThumb>
    )
  })

  return (
    <EmblaCarousel
      className='mt-32 sm:mt-0 sm:h-svh'
      autoplayActive
    >
      <EmblaViewport>
        <EmblaContainer>{renderedImages}</EmblaContainer>
      </EmblaViewport>
      <EmblaButtonPrev />
      <EmblaButtonNext />
      <EmblaThumbsContainer>{renderedThumbs}</EmblaThumbsContainer>
    </EmblaCarousel>
  )
}

HomeHeroCarousel.displayName = 'HomeHeroCarousel'

export {HomeHeroCarousel}
