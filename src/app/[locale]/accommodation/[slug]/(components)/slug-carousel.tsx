import * as dimitraImages from '@/public/images/accommodation/slug/dimitra'
import * as georgiaImages from '@/public/images/accommodation/slug/georgia'
import {CustomImage} from '@/src/components/ui/custom-image'
import {
  EmblaButtonNext,
  EmblaButtonPrev,
  EmblaCarousel,
  EmblaContainer,
  EmblaSlide,
  EmblaThumb,
  EmblaThumbsContainer,
  EmblaViewport
} from '@/src/components/ui/embla-carousel'
import {sortImportedImagesByName} from '@/src/lib/utils'

const slugImages = {
  georgia: sortImportedImagesByName(georgiaImages),
  dimitra: sortImportedImagesByName(dimitraImages)
}

const SlugCarousel: React.FC<{slug: Slug}> = ({slug}) => {
  const images = slugImages[slug]

  const slides = images.map((image, i) => (
    <EmblaSlide
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
    </EmblaSlide>
  ))

  const thumbnails = images.map((image, i) => (
    <EmblaThumb
      key={image.src}
      thumbIndex={i}
    >
      <CustomImage
        className='w-full h-full object-cover'
        src={image}
        alt={`${slug} page carousel thumb ${i + 1}`}
        sizes='(min-width: 640px) 80px, 40px'
      />
    </EmblaThumb>
  ))

  return (
    <EmblaCarousel
      className='sm:h-[calc(100svh-80px)]'
      asChild
    >
      <section>
        <EmblaViewport>
          <EmblaContainer>{slides}</EmblaContainer>
        </EmblaViewport>
        <EmblaButtonPrev />
        <EmblaButtonNext />
        <EmblaThumbsContainer>{thumbnails}</EmblaThumbsContainer>
      </section>
    </EmblaCarousel>
  )
}

SlugCarousel.displayName = 'SlugCarousel'

export {SlugCarousel}
