'use client'

import {
  IconChevronLeft,
  IconChevronRight,
  IconLibraryPhoto,
  IconX
} from '@tabler/icons-react'
import useEmblaCarousel from 'embla-carousel-react'
import {useCallback, useEffect, useMemo, useState} from 'react'
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
import {CarouselContext, useCarousel} from '@/src/context/carousel-context'
import {cn} from '@/src/lib/utils'

type EmblaApi = ReturnType<typeof useEmblaCarousel>[1]

interface CarouselProps extends React.ComponentPropsWithRef<'div'> {
  options?: Parameters<typeof useEmblaCarousel>[0]
  plugins?: Parameters<typeof useEmblaCarousel>[1]
}

function Carousel({className, options, plugins, ...props}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins)
  const [selectedSnap, setSelectedSnap] = useState(0)
  const [prevButtonDisabled, setPrevButtonDisabled] = useState(true)
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true)

  const stopAutoplay = useCallback(() => {
    if (!emblaApi) return

    emblaApi.plugins()?.autoplay?.stop()
  }, [emblaApi])

  const handleScrollPrev = useCallback(() => {
    if (!emblaApi) return

    stopAutoplay()
    emblaApi.scrollPrev()
  }, [emblaApi, stopAutoplay])

  const handleScrollNext = useCallback(() => {
    if (!emblaApi) return

    stopAutoplay()
    emblaApi.scrollNext()
  }, [emblaApi, stopAutoplay])

  const handleScrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return

      stopAutoplay()
      emblaApi.scrollTo(index)
    },
    [emblaApi, stopAutoplay]
  )

  const handleSelect = useCallback((emblaApi: EmblaApi) => {
    if (!emblaApi) return

    setSelectedSnap(emblaApi.selectedScrollSnap())
  }, [])

  const handleButtonsDisabled = useCallback((emblaApi: EmblaApi) => {
    if (!emblaApi) return

    setPrevButtonDisabled(!emblaApi?.canScrollPrev())
    setNextButtonDisabled(!emblaApi?.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    handleSelect(emblaApi)
    handleButtonsDisabled(emblaApi)

    emblaApi.on('reInit', handleSelect)
    emblaApi.on('reInit', handleButtonsDisabled)
    emblaApi.on('select', handleSelect)
    emblaApi.on('select', handleButtonsDisabled)

    return () => {
      emblaApi.off('reInit', handleSelect)
      emblaApi.off('reInit', handleButtonsDisabled)
      emblaApi.off('select', handleSelect)
      emblaApi.off('select', handleButtonsDisabled)
    }
  }, [emblaApi, handleSelect, handleButtonsDisabled])

  const contextValue = useMemo(() => {
    return {
      emblaRef,
      emblaApi,
      selectedSnap,
      prevButtonDisabled,
      nextButtonDisabled,
      handleScrollPrev,
      handleScrollNext,
      handleScrollTo
    }
  }, [
    emblaRef,
    emblaApi,
    selectedSnap,
    prevButtonDisabled,
    nextButtonDisabled,
    handleScrollPrev,
    handleScrollNext,
    handleScrollTo
  ])

  return (
    <CarouselContext.Provider value={contextValue}>
      <section
        className={cn(
          '[--slides-gap:--spacing(4)] relative overflow-hidden',
          className
        )}
        role='region'
        aria-roledescription='carousel'
        {...props}
      />
    </CarouselContext.Provider>
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
    // biome-ignore lint/a11y/useSemanticElements: false-positive
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
          className='absolute inset-s-1/2 inset-be-1.5 -translate-x-1/2 ease-mocca data-open:-translate-y-15 data-open:duration-750 data-closed:duration-375 sm:inset-be-4 sm:data-open:-translate-y-25'
          variant='outline'
          size='small'
        >
          {open ? <IconX /> : <IconLibraryPhoto />}
        </IconButton>
      </DrawerTrigger>
      <DrawerContent
        className='absolute bg-transparent shadow-none! sm:w-fit sm:left-1/2 sm:-translate-x-1/2'
        side='bottom'
      >
        <DrawerTitle className='sr-only'>
          Carousel thumbnails drawer
        </DrawerTitle>

        <div className='p-2 m-1 bg-surface-2 border border-border sm:p-3'>
          <Scrollarea>
            <ScrollareaViewport>
              <div
                className={cn('flex gap-2 sm:gap-4', className)}
                {...props}
              />
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
  ...props
}: React.ComponentPropsWithRef<'button'> & {
  thumbIndex: number
}) {
  const {selectedSnap, handleScrollTo} = useCarousel()

  return (
    <button
      className={cn(
        'size-10 overflow-hidden grayscale-75 opacity-75 contrast-75 transition sm:size-20',
        thumbIndex === selectedSnap && 'grayscale-0 opacity-100 contrast-125',
        className
      )}
      onClick={() => handleScrollTo(thumbIndex)}
      {...props}
    />
  )
}

function ButtonPrev({className}: {className?: string}) {
  const {handleScrollPrev, prevButtonDisabled} = useCarousel()

  return (
    <IconButton
      aria-label='Go to previous slide'
      className={cn(
        'absolute inset-bs-1/2 -translate-y-1/2 inset-s-4',
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
        'absolute inset-bs-1/2 -translate-y-1/2 inset-e-4',
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
