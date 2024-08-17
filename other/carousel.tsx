'use client'

import * as React from 'react'
import {Slot} from '@radix-ui/react-slot'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import {cn} from '#/lib/utils'
import {CarouselContext, useCarouselContext} from '#/other/carousel-context'

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'> & {
    options?: Parameters<typeof useEmblaCarousel>[0]
    autoPlay?: boolean
  }
>(({className, options = {loop: true}, autoPlay = false, ...props}, ref) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({delay: 5000, active: autoPlay})
  ])
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])

  const onPrevButtonClick = React.useCallback(
    function () {
      if (!emblaApi) return
      emblaApi.scrollPrev()
      if (autoPlay) {
        emblaApi.plugins().autoplay.stop()
      }
    },
    [emblaApi, autoPlay]
  )

  const onNextButtonClick = React.useCallback(
    function () {
      if (!emblaApi) return
      emblaApi.scrollNext()
      if (autoPlay) {
        emblaApi.plugins().autoplay.stop()
      }
    },
    [emblaApi, autoPlay]
  )

  const onDotButtonClick = React.useCallback(
    function (index: number) {
      if (!emblaApi) return
      emblaApi.scrollTo(index)
      if (autoPlay) {
        emblaApi.plugins().autoplay.stop()
      }
    },
    [emblaApi, autoPlay]
  )

  const onInit = React.useCallback(function (emblaApi: ReturnType<typeof useEmblaCarousel>[1]) {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = React.useCallback(function (emblaApi: ReturnType<typeof useEmblaCarousel>[1]) {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  React.useEffect(
    function () {
      if (!emblaApi) return
      console.log('%c EMBLA INIT ', 'background-color: #000; color: #26bfa5;')

      onInit(emblaApi)
      onSelect(emblaApi)
      emblaApi.on('reInit', onInit)
      emblaApi.on('reInit', onSelect)
      emblaApi.on('select', onSelect)
    },
    [emblaApi, onInit, onSelect]
  )

  return (
    <CarouselContext.Provider
      value={{
        emblaRef,
        emblaApi,
        onPrevButtonClick,
        onNextButtonClick,
        onDotButtonClick,
        selectedIndex,
        scrollSnaps
      }}
    >
      <div
        className={cn('relative', className)}
        ref={ref}
        {...props}
      />
    </CarouselContext.Provider>
  )
})

function CarouselViewport({className, ...props}: React.ComponentPropsWithoutRef<'div'>) {
  const {emblaRef} = useCarouselContext()

  return (
    <div
      className={cn('overflow-hidden', className)}
      ref={emblaRef}
      {...props}
    />
  )
}

const CarouselContainer = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({className, ...props}, ref) => (
    <div
      className={cn('flex', className)}
      ref={ref}
      {...props}
    />
  )
)

const CarouselSlide = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({className, ...props}, ref) => (
    <div
      className={cn('min-w-0 flex-[0_0_100%] select-none', className)}
      ref={ref}
      {...props}
    />
  )
)

const CarouselPrevButton = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  (props, ref) => {
    const {onPrevButtonClick} = useCarouselContext()

    return (
      <Slot
        onClick={onPrevButtonClick}
        ref={ref}
        {...props}
      />
    )
  }
)

const CarouselNextButton = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  (props, ref) => {
    const {onNextButtonClick} = useCarouselContext()

    return (
      <Slot
        onClick={onNextButtonClick}
        ref={ref}
        {...props}
      />
    )
  }
)

const CarouselDots = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({className, ...props}, ref) => {
    const {selectedIndex, scrollSnaps, onDotButtonClick} = useCarouselContext()

    return (
      <div
        className={cn('flex justify-center items-center gap-2', className)}
        ref={ref}
        {...props}
      >
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={cn(
              'shrink-0 h-3 w-3 border-2 border-surface-1 rounded-full cursor-pointer transition-colors active:scale-90',
              selectedIndex === index && 'bg-surface-1'
            )}
            type='button'
            onClick={() => onDotButtonClick(index)}
          />
        ))}
      </div>
    )
  }
)

Carousel.displayName = 'Carousel'
CarouselViewport.displayName = 'CarouselViewport'
CarouselContainer.displayName = 'CarouselContainer'
CarouselSlide.displayName = 'CarouselSlide'
CarouselPrevButton.displayName = 'CarouselPrevButton'
CarouselNextButton.displayName = 'CarouselNextButton'
CarouselDots.displayName = 'CarouselDots'

export {
  Carousel,
  CarouselViewport,
  CarouselContainer,
  CarouselSlide,
  CarouselPrevButton,
  CarouselNextButton,
  CarouselDots
}
