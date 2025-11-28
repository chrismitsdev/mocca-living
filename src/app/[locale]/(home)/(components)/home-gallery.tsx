'use client'

import {ExpandIcon, XIcon} from 'lucide-react'
import type {StaticImageData} from 'next/image'
import * as React from 'react'
import * as galleryImages from '@/public/images/home/home-gallery'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {Button} from '@/src/components/ui/button'
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
import {
  EmblaButtonNext,
  EmblaButtonPrev,
  EmblaCarousel,
  EmblaContainer,
  EmblaSlide,
  EmblaViewport
} from '@/src/components/ui/embla-carousel'
import {VisuallyHidden} from '@/src/components/ui/visually-hidden'
import {cn, sortImportedImagesByName} from '@/src/lib/utils'

const images = sortImportedImagesByName(galleryImages)

const triggerData: {className: string; sizes: string}[] = [
  {
    className: 'sm:col-start-1 sm:col-end-3 sm:row-start-1 sm:row-end-3',
    sizes: '(min-width: 640px) 372px, calc((100vw - 40px) / 2)'
  },
  {
    className: 'sm:col-start-3 sm:col-end-5 sm:row-start-1 sm:row-end-4',
    sizes: '(min-width: 640px) 372px, calc((100vw - 40px) / 2)'
  },
  {
    className: 'sm:col-start-5 sm:col-end-9 sm:row-start-1 sm:row-end-6',
    sizes: '(min-width: 640px) 752px, calc((100vw - 40px) / 2)'
  },
  {
    className: 'sm:col-start-1 sm:col-end-3 sm:row-start-3 sm:row-end-9',
    sizes: '(min-width: 640px) 372px, calc((100vw - 40px) / 2)'
  },
  {
    className: 'sm:col-start-3 sm:col-end-5 sm:row-start-4 sm:row-end-7',
    sizes: '(min-width: 640px) 372px, calc((100vw - 40px) / 2)'
  },
  {
    className: 'sm:col-start-3 sm:col-end-5 sm:row-start-7 sm:row-end-9',
    sizes: '(min-width: 640px) 372px, calc((100vw - 40px) / 2)'
  },
  {
    className: 'sm:col-start-5 sm:col-end-6 sm:row-start-6 sm:row-end-9',
    sizes: '(min-width: 640px) 182px, calc((100vw - 40px) / 2)'
  },
  {
    className: 'sm:col-start-6 sm:col-end-9 sm:row-start-6 sm:row-end-9',
    sizes: '(min-width: 640px) 562px, calc((100vw - 40px) / 2)'
  }
]

interface GalleryTriggerProps {
  className: string
  src: StaticImageData
  sizes: string
  alt: string
  onClick: () => void
}

const HomeGallery: React.FC = () => {
  const [index, setIndex] = React.useState(0)

  const thumbTriggers = images.map((image, i) => (
    <Trigger
      key={image.src}
      className={triggerData[i].className}
      src={image}
      sizes={triggerData[i].sizes}
      alt={`Gallery thumbnail image ${i + 1}`}
      onClick={() => setIndex(i)}
    />
  ))

  const slides = images.map((image, i) => (
    <EmblaSlide key={image.src}>
      <CustomImage
        className='w-full h-full rounded'
        src={image}
        sizes='(min-width: 640px) 1512px, 100vw'
        alt={`Gallery slide image ${i + 1}`}
      />
    </EmblaSlide>
  ))

  return (
    <Container asChild>
      <Section className='pt-16'>
        <Dialog>
          <div className='grid grid-cols-2 gap-2 sm:grid-cols-8 sm:grid-rows-8'>
            {thumbTriggers}
          </div>
          <DialogPortal>
            <DialogOverlay>
              <DialogContent
                className='p-0 bg-transparent max-w-[1512px]'
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                <VisuallyHidden>
                  <DialogTitle>Home page gallery images</DialogTitle>
                </VisuallyHidden>
                <EmblaCarousel options={{startIndex: index, loop: true}}>
                  <EmblaViewport>
                    <EmblaContainer>{slides}</EmblaContainer>
                  </EmblaViewport>
                  <EmblaButtonPrev />
                  <EmblaButtonNext />
                </EmblaCarousel>
              </DialogContent>
              <DialogClose
                className='absolute top-2 right-2 z-50'
                asChild
              >
                <Button
                  variant='error'
                  size='icon-small'
                >
                  <XIcon />
                </Button>
              </DialogClose>
            </DialogOverlay>
          </DialogPortal>
        </Dialog>
      </Section>
    </Container>
  )
}

const Trigger: React.FC<GalleryTriggerProps> = ({
  className,
  src,
  alt,
  sizes,
  onClick
}) => {
  return (
    <DialogTrigger
      className={cn(
        'relative overflow-hidden rounded shadow before:absolute before:inset-0 before:duration-700 before:ease-mocca hover:before:bg-black/80 focus-visible:outline-0 group',
        className
      )}
      onClick={onClick}
    >
      <CustomImage
        className='h-full w-full object-cover'
        src={src}
        alt={alt}
        sizes={sizes}
        quality={60}
      />
      <div className='hidden absolute inset-0 items-center justify-center group-hover:flex'>
        <ExpandIcon
          className='text-primary-foreground'
          size={32}
        />
      </div>
    </DialogTrigger>
  )
}

HomeGallery.displayName = 'HomeGallery'
Trigger.displayName = 'Trigger'

export {HomeGallery}
