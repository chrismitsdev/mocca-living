'use client'

import * as React from 'react'
import {type StaticImageData} from 'next/image'
import {XIcon, ExpandIcon} from 'lucide-react'
import {cn, sortImportedImagesByName} from '@/src/lib/utils'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogContent,
  DialogTitle
} from '@/src/components/ui/dialog'
import {
  EmblaCarousel,
  EmblaViewport,
  EmblaContainer,
  EmblaSlide,
  EmblaButtonPrev,
  EmblaButtonNext
} from '@/src/components/ui/embla-carousel'
import {CustomImage} from '@/src/components/ui/custom-image'
import {Button} from '@/src/components/ui/button'
import {VisuallyHidden} from '@/src/components/ui/visually-hidden'
import * as galleryImages from '@/public/images/home/home-gallery'

const images = sortImportedImagesByName(galleryImages)

const triggerClasses: string[] = [
  'sm:col-start-1 sm:col-end-3 sm:row-start-1 sm:row-end-3',
  'sm:col-start-3 sm:col-end-5 sm:row-start-1 sm:row-end-4',
  'sm:col-start-5 sm:col-end-9 sm:row-start-1 sm:row-end-6',
  'sm:col-start-1 sm:col-end-3 sm:row-start-3 sm:row-end-9',
  'sm:col-start-3 sm:col-end-5 sm:row-start-4 sm:row-end-7',
  'sm:col-start-3 sm:col-end-5 sm:row-start-7 sm:row-end-9',
  'sm:col-start-5 sm:col-end-6 sm:row-start-6 sm:row-end-9',
  'sm:col-start-6 sm:col-end-9 sm:row-start-6 sm:row-end-9'
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

  const thumbTriggers = images.map(function (image, i) {
    return (
      <Trigger
        key={image.src}
        className={triggerClasses[i]}
        src={image}
        sizes='(min-width: 640px) 752px, calc((100vw - 32px) / 2)'
        alt={`Gallery thumbnail image ${i + 1}`}
        onClick={() => setIndex(i)}
      />
    )
  })

  const slides = images.map(function (image, i) {
    return (
      <EmblaSlide key={image.src}>
        <CustomImage
          className='w-full h-full rounded'
          src={image}
          sizes='(min-width: 640px) 1512px, 100vw'
          alt={`Gallery slide image ${i + 1}`}
        />
      </EmblaSlide>
    )
  })

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
