'use client'

import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp
} from '@tabler/icons-react'
import type useEmblaCarousel from 'embla-carousel-react'
import {useState} from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger
} from '@/src/components/ui/drawer'
import {IconButton} from '@/src/components/ui/icon-button'
import {
  Scrollarea,
  ScrollareaBar,
  ScrollareaViewport
} from '@/src/components/ui/scrollarea'
import {CarouselProvider, useCarousel} from '@/src/context/carousel-context'
import {cn} from '@/src/lib/utils'

interface CarouselProps extends React.ComponentPropsWithRef<'section'> {
  options?: Parameters<typeof useEmblaCarousel>[0]
  plugins?: Parameters<typeof useEmblaCarousel>[1]
}

function Carousel({className, options, plugins, ...props}: CarouselProps) {
  return (
    <CarouselProvider
      options={options}
      plugins={plugins}
    >
      <section
        className={cn(
          '[--slides-gap:--spacing(4)] relative overflow-hidden',
          className
        )}
        role='region'
        aria-roledescription='carousel'
        {...props}
      />
    </CarouselProvider>
  )
}

function CarouselViewport({
  className,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  const {emblaRef} = useCarousel()

  return (
    <div
      className={cn('h-full overflow-hidden', className)}
      ref={emblaRef}
      {...props}
    />
  )
}

function SlidesContainer({
  className,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={cn('-ml-(--slides-gap) h-full flex', className)}
      {...props}
    />
  )
}

function Slide({className, ...props}: React.ComponentPropsWithRef<'div'>) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: <fieldset> not applicable
    <div
      className={cn(
        'pl-(--slides-gap) min-w-0 grow-0 shrink-0 basis-full select-none',
        className
      )}
      role='group'
      aria-roledescription='slide'
      {...props}
    />
  )
}

function ThumbsContainer({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
    >
      <DrawerTrigger asChild>
        <IconButton
          aria-label='Show thumbnails images container'
          className='absolute inset-s-1/2 inset-be-1.5 -translate-x-1/2 ease-mocca data-open:-translate-y-15 data-open:duration-750 data-closed:duration-375 sm:inset-be-4 sm:data-open:-translate-y-25 group'
          variant='outline'
          size='small'
        >
          <IconChevronUp className='transition ease-mocca data-open:duration-750 data-closed:duration-375 group-data-open:rotate-180' />
        </IconButton>
      </DrawerTrigger>
      <DrawerContent
        className='absolute bg-transparent shadow-none sm:data-bottom:w-fit sm:data-bottom:inset-s-1/2 sm:data-bottom:-translate-x-1/2'
        side='bottom'
      >
        <DrawerTitle className='sr-only'>
          Carousel thumbnails drawer
        </DrawerTitle>

        <div className='m-1 bg-surface-2 border border-border'>
          <Scrollarea>
            <ScrollareaViewport>
              <div
                className={cn('m-2 flex gap-2 sm:m-3', className)}
                {...props}
              >
                {children}
              </div>
            </ScrollareaViewport>
            <ScrollareaBar
              className='invisible'
              orientation='horizontal'
            />
          </Scrollarea>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function Thumb({
  className,
  thumbIndex,
  children,
  ...props
}: React.ComponentPropsWithRef<'button'> & {
  thumbIndex: number
}) {
  const {selectedSnap, handleScrollTo} = useCarousel()

  return (
    <button
      className={cn(
        'size-10 focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-2 sm:size-20',
        className
      )}
      onClick={() => handleScrollTo(thumbIndex)}
      {...props}
    >
      <span
        className={cn(
          'block size-full grayscale-50 opacity-50 contrast-50 transition',
          thumbIndex === selectedSnap && 'grayscale-0 opacity-100 contrast-100'
        )}
      >
        {children}
      </span>
    </button>
  )
}

function ButtonPrev({className}: {className?: string}) {
  const {handleScrollPrev, prevButtonDisabled} = useCarousel()

  return (
    <IconButton
      aria-label='Go to previous slide'
      className={cn(
        'absolute inset-bs-1/2 -translate-y-1/2 inset-s-2 sm:inset-s-4',
        className
      )}
      variant='outline'
      size='small'
      onClick={handleScrollPrev}
      disabled={prevButtonDisabled}
    >
      <IconChevronLeft />
    </IconButton>
  )
}

function ButtonNext({className}: {className?: string}) {
  const {handleScrollNext, nextButtonDisabled} = useCarousel()

  return (
    <IconButton
      aria-label='Go to next slide'
      className={cn(
        'absolute inset-bs-1/2 -translate-y-1/2 inset-e-2 sm:inset-e-4',
        className
      )}
      variant='outline'
      size='small'
      onClick={handleScrollNext}
      disabled={nextButtonDisabled}
    >
      <IconChevronRight />
    </IconButton>
  )
}

Carousel.displayName = 'Carousel'
CarouselViewport.displayName = 'CarouselViewport'
SlidesContainer.displayName = 'SlidesContainer'
Slide.displayName = 'Slide'
ThumbsContainer.displayName = 'ThumbsContainer'
Thumb.displayName = 'Thumb'
ButtonPrev.displayName = 'ButtonPrev'
ButtonNext.displayName = 'ButtonNext'

export {
  ButtonNext,
  ButtonPrev,
  Carousel,
  CarouselViewport,
  Slide,
  SlidesContainer,
  Thumb,
  ThumbsContainer
}
