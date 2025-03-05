'use client'

import * as React from 'react'
import {type LucideProps, ChevronLeftIcon, ChevronRightIcon} from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import {
  EmblaContext,
  useEmblaContext
} from '@/src/context/embla-carousel-context'
import {useMediaQuery} from '@/src/hooks/useMediaQuery'
import {cn} from '@/src/lib/utils'
import {Button} from '@/src/components/ui/button'

interface EmblaCarouselProps extends React.ComponentPropsWithRef<'div'> {
  startIndex?: number
  autoplayDelay?: number
  autoplayActive?: boolean
}

const EmblaCarousel: React.FC<EmblaCarouselProps> = ({
  className,
  startIndex = 0,
  autoplayDelay = 3500,
  autoplayActive = false,
  ...props
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({loop: true, startIndex}, [
    Autoplay({delay: autoplayDelay, active: autoplayActive})
  ])

  const scrollPrevSlide = React.useCallback(
    function () {
      if (!emblaApi) return
      const isAutoPlaying = emblaApi.plugins().autoplay.isPlaying()

      emblaApi.scrollPrev()

      if (isAutoPlaying) {
        emblaApi.plugins().autoplay.stop()
      }
    },
    [emblaApi]
  )

  const scrollNextSlide = React.useCallback(
    function () {
      if (!emblaApi) return
      const isAutoPlaying = emblaApi.plugins().autoplay.isPlaying()

      emblaApi.scrollNext()

      if (isAutoPlaying) {
        emblaApi.plugins().autoplay.stop()
      }
    },
    [emblaApi]
  )

  return (
    <EmblaContext
      value={{emblaRef, emblaApi, scrollPrevSlide, scrollNextSlide}}
    >
      <div
        id='embla'
        className={cn('relative', className)}
        {...props}
      />
    </EmblaContext>
  )
}

const EmblaViewport: React.FC<React.ComponentPropsWithRef<'div'>> = ({
  className,
  ...props
}) => {
  const {emblaRef} = useEmblaContext()

  return (
    <div
      id='embla-viewport'
      className={cn('overflow-hidden h-full', className)}
      ref={emblaRef}
      {...props}
    />
  )
}

const EmblaContainer: React.FC<React.ComponentPropsWithRef<'div'>> = ({
  className,
  ...props
}) => {
  return (
    <div
      id='embla-container'
      className={cn('h-full flex', className)}
      {...props}
    />
  )
}

const EmblaSlide: React.FC<React.ComponentPropsWithRef<'div'>> = ({
  className,
  ...props
}) => {
  return (
    <div
      id='embla-slide'
      className={cn(
        'mr-4 grow-0 shrink-0 basis-full min-w-0 select-none',
        className
      )}
      {...props}
    />
  )
}

const EmblaButtonPrev: React.FC<
  Omit<React.ComponentPropsWithRef<typeof Button>, 'size'> & {
    icon?: React.ComponentType<LucideProps>
  }
> = ({className, icon, ...props}) => {
  const {scrollPrevSlide} = useEmblaContext()
  const matches = useMediaQuery('(min-width: 640px)', {
    initializeWithValue: false
  })

  return (
    <Button
      id='embla-button-prev'
      className={cn('absolute top-1/2 -translate-y-1/2 left-4', className)}
      size={matches ? 'icon-normal' : 'icon-small'}
      onClick={scrollPrevSlide}
      {...props}
    >
      {!icon ? <ChevronLeftIcon /> : React.createElement(icon)}
    </Button>
  )
}

const EmblaButtonNext: React.FC<
  Omit<React.ComponentPropsWithRef<typeof Button>, 'size'> & {
    icon?: React.ComponentType<LucideProps>
  }
> = ({className, icon, ...props}) => {
  const {scrollNextSlide} = useEmblaContext()
  const matches = useMediaQuery('(min-width: 640px)', {
    initializeWithValue: false
  })

  return (
    <Button
      id='embla-button-next'
      className={cn('absolute top-1/2 -translate-y-1/2 right-4', className)}
      size={matches ? 'icon-normal' : 'icon-small'}
      onClick={scrollNextSlide}
      {...props}
    >
      {!icon ? <ChevronRightIcon /> : React.createElement(icon)}
    </Button>
  )
}

EmblaCarousel.displayName = 'EmblaCarousel'
EmblaViewport.displayName = 'EmblaViewport'
EmblaContainer.displayName = 'EmblaContainer'
EmblaSlide.displayName = 'EmblaSlide'
EmblaButtonPrev.displayName = 'EmblaButtonPrev'
EmblaButtonNext.displayName = 'EmblaButtonNext'

export {
  EmblaCarousel,
  EmblaViewport,
  EmblaContainer,
  EmblaSlide,
  EmblaButtonPrev,
  EmblaButtonNext
}
