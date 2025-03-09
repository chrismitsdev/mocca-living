import {
  EmblaCarousel,
  EmblaViewport,
  EmblaContainer,
  EmblaSlide,
  EmblaButtonPrev,
  EmblaButtonNext,
  EmblaThumbsContainer,
  EmblaThumb
} from '@/src/components/ui/embla-carousel'
import {CustomImage} from '@/src/components/ui/custom-image'
import {sortImportedImagesByName} from '@/src/lib/utils'
import * as dimitraImages from '@/public/images/accomodation/slug/dimitra'
import * as georgiaImages from '@/public/images/accomodation/slug/georgia'

const slugImages = {
  georgia: sortImportedImagesByName(georgiaImages),
  dimitra: sortImportedImagesByName(dimitraImages)
}

const SlugCarousel: React.FC<{slug: Slug}> = ({slug}) => {
  const images = slugImages[slug]

  const renderedImages = images.map(function (image, i) {
    return (
      <EmblaSlide
        key={image.src}
        className='mr-0'
      >
        <CustomImage
          className='w-full h-full object-cover'
          src={image}
          alt={`${slug} carousel image ${i + 1}`}
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
          alt={`${slug} carousel thumb ${i + 1}`}
        />
      </EmblaThumb>
    )
  })

  return (
    <EmblaCarousel className='mt-32 sm:mt-0 sm:h-svh'>
      <EmblaViewport>
        <EmblaContainer>{renderedImages}</EmblaContainer>
      </EmblaViewport>
      <EmblaButtonPrev />
      <EmblaButtonNext />
      <EmblaThumbsContainer>{renderedThumbs}</EmblaThumbsContainer>
    </EmblaCarousel>
  )
}

SlugCarousel.displayName = 'SlugCarousel'

export {SlugCarousel}
