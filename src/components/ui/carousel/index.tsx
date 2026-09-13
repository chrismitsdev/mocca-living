'use client'

import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp
} from '@tabler/icons-react'
import type useEmblaCarousel from 'embla-carousel-react'
import {Dialog} from 'radix-ui'
import {IconButton} from '@/src/components/ui/icon-button'
import {
  Scrollarea,
  ScrollareaBar,
  ScrollareaViewport
} from '@/src/components/ui/scrollarea'
import {cn} from '@/src/lib/utils'
import {CarouselProvider, useCarousel} from './context'

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

function ThumbsContainer({children}: React.PropsWithChildren) {
  const positionStyles = 'absolute inset-x-1/2 -translate-x-1/2 inset-be-0'

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <IconButton
          aria-label='Show thumbnails container'
          className={cn(
            positionStyles,
            'ease-mocca group',
            [
              'data-closed:duration-750',
              'data-closed:-translate-y-1',
              'sm:data-closed:-translate-y-2'
            ],
            [
              'data-open:duration-1000',
              'data-open:-translate-y-17',
              'sm:data-open:-translate-y-28'
            ]
          )}
          variant='outline'
          size='small'
        >
          <IconChevronUp className='ease-mocca group-data-open:duration-1000 group-data-closed:duration-750 group-data-open:rotate-180' />
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Content
        className={cn(
          positionStyles,
          'inline-max max-inline-full',
          ['data-closed:animate-drawer-bottom-close'],
          ['data-open:animate-drawer-bottom-open']
        )}
      >
        <Dialog.Title className='sr-only'>
          Click image thumbnail to view image in carousel
        </Dialog.Title>
        <div className='m-1 bg-surface-2 border border-border sm:m-2'>
          <Scrollarea type='always'>
            <ScrollareaViewport>
              <div className='m-2 flex gap-2'>{children}</div>
            </ScrollareaViewport>
            <ScrollareaBar
              className='invisible'
              orientation='horizontal'
            />
          </Scrollarea>
        </div>
      </Dialog.Content>
    </Dialog.Root>
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
        'absolute inset-bs-1/2 -translate-y-1/2 inset-s-1 sm:inset-s-2',
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
        'absolute inset-bs-1/2 -translate-y-1/2 inset-e-1 sm:inset-e-2',
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
