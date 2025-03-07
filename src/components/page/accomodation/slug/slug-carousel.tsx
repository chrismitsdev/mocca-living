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

  return (
    <EmblaCarousel className='h-screen'>
      <EmblaViewport>
        <EmblaContainer>{renderedImages}</EmblaContainer>
      </EmblaViewport>
      <EmblaButtonPrev />
      <EmblaButtonNext />
    </EmblaCarousel>
  )
}

SlugCarousel.displayName = 'SlugCarousel'

export {SlugCarousel}
