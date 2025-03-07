import {
  EmblaCarousel,
  EmblaViewport,
  EmblaContainer,
  EmblaSlide,
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
          alt={`Home page carousel image ${i + 1}`}
          priority
        />
      </EmblaSlide>
    )
  })

  return (
    <EmblaCarousel
      className='h-svh'
      autoplayActive
    >
      <EmblaViewport>
        <EmblaContainer>{renderedImages}</EmblaContainer>
      </EmblaViewport>
      <EmblaButtonPrev />
      <EmblaButtonNext />
    </EmblaCarousel>
  )
}

HomeHeroCarousel.displayName = 'HomeHeroCarousel'

export {HomeHeroCarousel}
