'use client'

import {Slot} from '@radix-ui/react-slot'
import useEmblaCarousel from 'embla-carousel-react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ImagesIcon,
  XIcon
} from 'lucide-react'
import {useCallback, useEffect, useState} from 'react'
import {Button} from '@/src/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger
} from '@/src/components/ui/drawer'
import {
  ScrollArea,
  ScrollAreaBar,
  ScrollAreaViewport
} from '@/src/components/ui/scrollarea'
import {VisuallyHidden} from '@/src/components/ui/visually-hidden'
import {
  EmblaContext,
  useEmblaContext
} from '@/src/context/embla-carousel-context'
import {cn} from '@/src/lib/utils'

type EmblaApiType = ReturnType<typeof useEmblaCarousel>[1]

interface CarouselProps extends React.ComponentPropsWithRef<'div'> {
  options?: Parameters<typeof useEmblaCarousel>[0]
  plugins?: Parameters<typeof useEmblaCarousel>[1]
  asChild?: boolean
}

function Carousel({
  className,
  options = {
    loop: true,
    startIndex: 0
  },
  plugins,
  asChild = false,
  ...props
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins)
  const [selectedIndex, setSelectedIndex] = useState<number>(
    options.startIndex ?? 0
  )
  const Comp = asChild ? Slot : 'div'

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return

    if (emblaApi.plugins()?.autoplay) {
      emblaApi.plugins().autoplay.stop()
    }

    emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return

    if (emblaApi.plugins()?.autoplay) {
      emblaApi.plugins().autoplay.stop()
    }

    emblaApi.scrollNext()
  }, [emblaApi])

  const onThumbButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return

      if (emblaApi.plugins()?.autoplay) {
        emblaApi.plugins().autoplay.stop()
      }

      emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  const onSelect = useCallback((emblaApi: EmblaApiType) => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('select', onSelect)

    return () => {
      emblaApi.off('reInit', onSelect).off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <EmblaContext
      value={{
        emblaRef,
        emblaApi,
        selectedIndex,
        onPrevButtonClick,
        onNextButtonClick,
        onThumbButtonClick
      }}
    >
      <Comp
        className={cn('relative overflow-hidden', className)}
        {...props}
      />
    </EmblaContext>
  )
}

function Viewport({className, ...props}: React.ComponentPropsWithRef<'div'>) {
  const {emblaRef} = useEmblaContext()

  return (
    <div
      className={cn('overflow-hidden h-full', className)}
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
      className={cn('h-full flex', className)}
      {...props}
    />
  )
}

function Slide({className, ...props}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={cn(
        'min-w-0 grow-0 shrink-0 basis-full select-none',
        className
      )}
      {...props}
    />
  )
}

function ThumbsContainer({
  className,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      modal={false}
    >
      <DrawerTrigger asChild>
        <Button
          className='absolute left-1/2 bottom-1.5 -translate-x-1/2 transition ease-mocca data-open:-translate-y-15 data-open:duration-750 data-closed:duration-375 sm:bottom-4 sm:data-open:-translate-y-25'
          variant={!open ? 'primary-alt' : 'error'}
          size='icon-small'
          aria-label={`${open ? 'Hide' : 'Show'} thumbnail images`}
        >
          {open ? <XIcon /> : <ImagesIcon />}
        </Button>
      </DrawerTrigger>
      <DrawerContent
        className='absolute bg-transparent shadow-none! sm:w-fit sm:left-1/2 sm:-translate-x-1/2'
        side='bottom'
      >
        <VisuallyHidden>
          <DrawerTitle>Carousel thumbnails drawer</DrawerTitle>
        </VisuallyHidden>
        <div className='p-2 m-1 bg-surface-2 rounded sm:p-3'>
          <ScrollArea>
            <ScrollAreaViewport>
              <div
                className={cn('flex gap-2 sm:gap-4', className)}
                {...props}
              />
            </ScrollAreaViewport>
            <ScrollAreaBar
              className='invisible'
              orientation='horizontal'
            />
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function Thumb({
  className,
  thumbIndex,
  ...props
}: React.ComponentPropsWithRef<'button'> & {thumbIndex: number}) {
  const {selectedIndex, onThumbButtonClick} = useEmblaContext()

  return (
    <button
      className={cn(
        'size-10 rounded-xs overflow-hidden grayscale-75 opacity-75 contrast-75 transition sm:size-20',
        thumbIndex === selectedIndex && 'grayscale-0 opacity-100 contrast-125',
        className
      )}
      onClick={() => onThumbButtonClick(thumbIndex)}
      {...props}
    />
  )
}

function ButtonPrev({
  className,
  'aria-label': ariaLabel = 'Go to previous slide',
  ...props
}: Omit<React.ComponentPropsWithRef<typeof Button>, 'children'>) {
  const {onPrevButtonClick} = useEmblaContext()

  return (
    <Button
      className={cn(
        'absolute top-1/2 -translate-y-1/2 left-1.5 sm:left-4',
        className
      )}
      aria-label={ariaLabel}
      variant='primary-alt'
      size='icon-small'
      onClick={onPrevButtonClick}
      {...props}
    >
      <ChevronLeftIcon />
    </Button>
  )
}

function ButtonNext({
  className,
  'aria-label': ariaLabel = 'Go to next slide',
  ...props
}: Omit<React.ComponentPropsWithRef<typeof Button>, 'children'>) {
  const {onNextButtonClick} = useEmblaContext()

  return (
    <Button
      className={cn(
        'absolute top-1/2 -translate-y-1/2 right-1.5 sm:right-4',
        className
      )}
      aria-label={ariaLabel}
      variant='primary-alt'
      size='icon-small'
      onClick={onNextButtonClick}
      {...props}
    >
      <ChevronRightIcon />
    </Button>
  )
}

Carousel.displayName = 'Carousel'
Viewport.displayName = 'Viewport'
SlidesContainer.displayName = 'SlidesContainer'
Slide.displayName = 'Slide'
ThumbsContainer.displayName = 'ThumbsContainer'
Thumb.displayName = 'Thumb'
ButtonPrev.displayName = 'ButtonPrev'
ButtonNext.displayName = 'ButtonNext'

export {
  Carousel,
  Viewport,
  SlidesContainer,
  Slide,
  ThumbsContainer,
  Thumb,
  ButtonPrev,
  ButtonNext
}
