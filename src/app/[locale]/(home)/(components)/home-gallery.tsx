'use client'

import {IconMaximize} from '@tabler/icons-react'
import type {StaticImageData} from 'next/image'
import {useState} from 'react'
import {homeGalleryImages} from '@/public/images/home/home-gallery'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {
  ButtonNext,
  ButtonPrev,
  Carousel,
  CarouselViewport,
  Slide,
  SlidesContainer
} from '@/src/components/ui/carousel'
import {CustomImage} from '@/src/components/ui/custom-image'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger
} from '@/src/components/ui/dialog'
import {cn} from '@/src/lib/utils'

const triggers: {
  className: string
  sizes: string
}[] = [
  {
    className: 'sm:col-start-1 sm:col-end-3 sm:row-start-1 sm:row-end-3',
    sizes: '(min-width: 640px) 372px'
  },
  {
    className: 'sm:col-start-3 sm:col-end-5 sm:row-start-1 sm:row-end-4',
    sizes: '(min-width: 640px) 372px'
  },
  {
    className: 'sm:col-start-5 sm:col-end-9 sm:row-start-1 sm:row-end-6',
    sizes: '(min-width: 640px) 752px'
  },
  {
    className: 'sm:col-start-1 sm:col-end-3 sm:row-start-3 sm:row-end-9',
    sizes: '(min-width: 640px) 372px'
  },
  {
    className: 'sm:col-start-3 sm:col-end-5 sm:row-start-4 sm:row-end-7',
    sizes: '(min-width: 640px) 372px'
  },
  {
    className: 'sm:col-start-3 sm:col-end-5 sm:row-start-7 sm:row-end-9',
    sizes: '(min-width: 640px) 372px'
  },
  {
    className: 'sm:col-start-5 sm:col-end-6 sm:row-start-6 sm:row-end-9',
    sizes: '(min-width: 640px) 182px'
  },
  {
    className: 'sm:col-start-6 sm:col-end-9 sm:row-start-6 sm:row-end-9',
    sizes: '(min-width: 640px) 562px'
  }
]

function HomeGallery() {
  const [index, setIndex] = useState(0)

  const renderedTriggers = homeGalleryImages.map((image, i) => (
    <HomeGalleryTrigger
      key={image.src}
      className={triggers[i].className}
      src={image}
      sizes={triggers[i].sizes.concat(', calc((100vw - 40px) / 2)')}
      alt={`Gallery thumbnail image ${i + 1}`}
      onClick={() => setIndex(i)}
    />
  ))

  const renderedSlides = homeGalleryImages.map((image, i) => (
    <Slide key={image.src}>
      <CustomImage
        src={image}
        sizes='(min-width: 640px) 1512px, 100vw'
        alt={`Gallery slide image ${i + 1}`}
      />
    </Slide>
  ))

  return (
    <Section>
      <Container>
        <Dialog>
          <div className='grid grid-cols-2 gap-2 sm:grid-cols-8 sm:grid-rows-8'>
            {renderedTriggers}
          </div>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent
              className='block-auto bg-transparent'
              onCloseAutoFocus={(e) => e.preventDefault()}
            >
              <DialogClose
                variant='outline'
                className='inset-bs-2 inset-e-2'
              />
              <DialogTitle className='sr-only'>
                Home page gallery images
              </DialogTitle>
              <Carousel options={{startIndex: index, loop: true}}>
                <CarouselViewport>
                  <SlidesContainer>{renderedSlides}</SlidesContainer>
                </CarouselViewport>
                <ButtonPrev />
                <ButtonNext />
              </Carousel>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </Container>
    </Section>
  )
}

function HomeGalleryTrigger({
  className,
  src,
  alt,
  sizes,
  onClick
}: {
  className: string
  src: StaticImageData
  sizes: string
  alt: string
  onClick: () => void
}) {
  return (
    <DialogTrigger
      className={cn(
        'relative overflow-hidden shadow-sm before:absolute before:inset-0 before:duration-700 before:ease-mocca hover:before:bg-black/75 focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-2 group',
        className
      )}
      onClick={onClick}
    >
      <CustomImage
        src={src}
        alt={alt}
        sizes={sizes}
      />
      <span className='hidden absolute inset-0 content-center group-hover:block'>
        <IconMaximize className='mx-auto size-8 text-primary-foreground' />
      </span>
    </DialogTrigger>
  )
}

HomeGallery.displayName = 'HomeGallery'
HomeGalleryTrigger.displayName = 'HomeGalleryTrigger'

export {HomeGallery}
