'use client'

import * as React from 'react'
import Image, {StaticImageData} from 'next/image'
import {XIcon, ExpandIcon} from 'lucide-react'
import {Container} from '@/components/shared/container'
import {Button} from '@/components/ui/button'
import {VisuallyHidden} from '@/components/ui/visually-hidden'
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogContent,
  DialogTitle
} from '@/components/ui/dialog'
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
  CarouselThumbnailImage,
  CarouselCount
} from '@/components/ui/carousel'
import {cn} from '#/lib/utils'
import * as outdoorImages from '#/public/images/outdoor'

const images = Object.values(outdoorImages).slice(0, 8)

function Gallery() {
  const [index, setIndex] = React.useState(0)

  return (
    <Container
      className='space-y-6'
      asChild
    >
      <article>
        <Dialog>
          <div className='grid grid-cols-2 gap-2 sm:grid-cols-8 sm:grid-rows-8'>
            <GalleryItem
              className='sm:col-start-1 sm:col-end-3 sm:row-start-1 sm:row-end-3'
              src={images[0]}
              alt='Carousel preview image 1'
              onClick={() => setIndex(0)}
            />
            <GalleryItem
              className='s sm:col-start-3 sm:col-end-5 sm:row-start-1 sm:row-end-4'
              src={images[1]}
              alt='Carousel preview image 2'
              onClick={() => setIndex(1)}
            />
            <GalleryItem
              className='sm:col-start-5 sm:col-end-9 sm:row-start-1 sm:row-end-6'
              src={images[2]}
              alt='Carousel preview image 3'
              onClick={() => setIndex(2)}
            />
            <GalleryItem
              className='sm:col-start-1 sm:col-end-3 sm:row-start-3 sm:row-end-9'
              src={images[3]}
              alt='Carousel preview image 4'
              onClick={() => setIndex(3)}
            />
            <GalleryItem
              className='sm:col-start-3 sm:col-end-5 sm:row-start-4 sm:row-end-7'
              src={images[4]}
              alt='Carousel preview image 5'
              onClick={() => setIndex(4)}
            />
            <GalleryItem
              className='sm:col-start-3 sm:col-end-5 sm:row-start-7 sm:row-end-9'
              src={images[5]}
              alt='Carousel preview image 6'
              onClick={() => setIndex(5)}
            />
            <GalleryItem
              className='sm:col-start-5 sm:col-end-6 sm:row-start-6 sm:row-end-9'
              src={images[6]}
              alt='Carousel preview image 7'
              onClick={() => setIndex(6)}
            />
            <GalleryItem
              className='sm:col-start-6 sm:col-end-9 sm:row-start-6 sm:row-end-9'
              src={images[7]}
              alt='Carousel preview image 8'
              onClick={() => setIndex(7)}
            />
          </div>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent
              className='p-0 max-w-full h-full bg-[unset] shadow-none'
              onCloseAutoFocus={(e) => e.preventDefault()}
            >
              <VisuallyHidden>
                <DialogTitle>{'Gallery carousel'}</DialogTitle>
              </VisuallyHidden>
              <CarouselProvider
                activeIndex={index}
                className='bg-[unset]'
                images={images}
              >
                <CarouselRoot>
                  <CarouselViewport>
                    <CarouselImageContainer>
                      {images.map((image, i) => (
                        <CarouselImage
                          className='!opacity-100'
                          key={i + 1}
                          index={i}
                          src={image}
                          alt={`Gallery carousel image ${i + 1}`}
                        />
                      ))}
                    </CarouselImageContainer>
                  </CarouselViewport>
                  <CarouselThumbnailViewport>
                    <CarouselThumbnailContainer>
                      {images.map((image, i) => (
                        <CarouselThumbnailButton
                          key={i + 2}
                          index={i}
                        >
                          <CarouselThumbnailImage
                            src={image}
                            alt={`Gallery carousel image thumbnail ${i + 1}`}
                          />
                        </CarouselThumbnailButton>
                      ))}
                    </CarouselThumbnailContainer>
                  </CarouselThumbnailViewport>
                  <CarouselPrevButton size='icon-small' />
                  <CarouselNextButton size='icon-small' />
                  <CarouselCount />
                </CarouselRoot>
              </CarouselProvider>
              <DialogClose asChild>
                <Button
                  className='absolute top-2 right-2'
                  variant='primary-alt'
                  size='icon-small'
                >
                  <XIcon size={24} />
                </Button>
              </DialogClose>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </article>
    </Container>
  )
}

function GalleryItem({
  className,
  src,
  alt,
  onClick
}: {
  className: string
  src: StaticImageData
  alt: string
  onClick: () => void
}) {
  return (
    <DialogTrigger
      className={cn(
        'relative overflow-hidden rounded shadow before:absolute before:inset-0 hover:before:bg-black/75 before:duration-700 before:ease-mocca focus-visible:outline-0 group',
        className
      )}
      onClick={onClick}
    >
      <Image
        className='h-full object-cover'
        src={src}
        alt={alt}
      />
      <div className='hidden absolute inset-0 group-hover:flex items-center justify-center text-primary-foreground'>
        <ExpandIcon size={32} />
      </div>
    </DialogTrigger>
  )
}

Gallery.displayName = 'Gallery'
GalleryItem.displayName = 'GalleryItem'

export {Gallery}
