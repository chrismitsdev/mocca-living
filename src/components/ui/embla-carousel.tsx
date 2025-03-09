'use client'

import * as React from 'react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ImagesIcon,
  XIcon,
  type LucideProps
} from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import {cn} from '@/src/lib/utils'
import {useMediaQuery} from '@/src/hooks/useMediaQuery'
import {
  EmblaContext,
  useEmblaContext
} from '@/src/context/embla-carousel-context'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle
} from '@/src/components/ui/drawer'
import {
  ScrollArea,
  ScrollAreaViewport,
  ScrollAreaBar
} from '@/src/components/ui/scrollarea'
import {VisuallyHidden} from '@/src/components/ui/visually-hidden'
import {Button} from '@/src/components/ui/button'

type EmblaCarouselType = ReturnType<typeof useEmblaCarousel>[1]

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
  const [selectedIndex, setSelectedIndex] = React.useState<number>(startIndex)
  const mediaQueryMatches = useMediaQuery('(min-width: 640px)', {
    initializeWithValue: false
  })

  const onPrevButtonClick = React.useCallback(
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

  const onNextButtonClick = React.useCallback(
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

  const onThumbButtonClick = React.useCallback(
    function (index: number) {
      if (!emblaApi) return

      const isAutoPlaying = emblaApi.plugins().autoplay.isPlaying()
      emblaApi.scrollTo(index)

      if (isAutoPlaying) {
        emblaApi.plugins().autoplay.stop()
      }
    },
    [emblaApi]
  )

  const onSelect = React.useCallback(function (emblaApi: EmblaCarouselType) {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  React.useEffect(
    function () {
      if (!emblaApi) return

      onSelect(emblaApi)
      emblaApi.on('reInit', onSelect).on('select', onSelect)
    },
    [emblaApi, onSelect]
  )

  return (
    <EmblaContext
      value={{
        emblaRef,
        emblaApi,
        selectedIndex,
        onPrevButtonClick,
        onNextButtonClick,
        onThumbButtonClick,
        mediaQueryMatches
      }}
    >
      <div
        id='embla'
        className={cn('relative overflow-hidden', className)}
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

const EmblaThumbsContainer: React.FC<React.ComponentPropsWithRef<'div'>> = ({
  className,
  ...props
}) => {
  const [open, setOpen] = React.useState<boolean>(false)
  const {mediaQueryMatches} = useEmblaContext()

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      modal={false}
    >
      <DrawerTrigger asChild>
        <Button
          className='absolute left-1/2 bottom-2 -translate-x-1/2 data-open:-translate-y-18 data-open:duration-[750ms] data-closed:duration-[375ms] transition ease-mocca sm:data-open:-translate-y-28 '
          variant={!open ? 'primary-alt' : 'error'}
          size={mediaQueryMatches ? 'icon-normal' : 'icon-small'}
        >
          {open ? <XIcon /> : <ImagesIcon />}
        </Button>
      </DrawerTrigger>
      <DrawerContent
        className='absolute bg-transparent !shadow-none'
        side='bottom'
        onInteractOutside={(e) => e.preventDefault()}
      >
        <VisuallyHidden>
          <DrawerTitle>Carousel thumbnails drawer</DrawerTitle>
        </VisuallyHidden>
        <div className='py-3 px-2 m-1.5 glassmorphed-surface-dark'>
          <ScrollArea>
            <ScrollAreaViewport>
              <div
                id='embla-thumbs-container'
                className={cn('flex justify-center gap-3', className)}
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

const EmblaThumb: React.FC<
  React.ComponentPropsWithRef<'button'> & {thumbIndex: number}
> = ({className, thumbIndex, ...props}) => {
  const {selectedIndex, onThumbButtonClick} = useEmblaContext()

  return (
    <button
      id='embla-thumb'
      className={cn(
        'size-10 sm:size-20 rounded-xs overflow-hidden grayscale-100 contrast-75 transition',
        thumbIndex === selectedIndex && 'grayscale-0 contrast-100',
        className
      )}
      onClick={() => onThumbButtonClick(thumbIndex)}
      {...props}
    />
  )
}

const EmblaButtonPrev: React.FC<
  Omit<React.ComponentPropsWithRef<typeof Button>, 'size'> & {
    icon?: React.ComponentType<LucideProps>
  }
> = ({className, icon, ...props}) => {
  const {onPrevButtonClick, mediaQueryMatches} = useEmblaContext()

  return (
    <Button
      id='embla-button-prev'
      className={cn(
        'absolute top-1/2 -translate-y-1/2 left-2 sm:left-4',
        className
      )}
      variant='primary-alt'
      size={mediaQueryMatches ? 'icon-normal' : 'icon-small'}
      onClick={onPrevButtonClick}
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
  const {onNextButtonClick, mediaQueryMatches} = useEmblaContext()

  return (
    <Button
      id='embla-button-next'
      className={cn(
        'absolute top-1/2 -translate-y-1/2 right-2 sm:right-4',
        className
      )}
      variant='primary-alt'
      size={mediaQueryMatches ? 'icon-normal' : 'icon-small'}
      onClick={onNextButtonClick}
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
EmblaThumbsContainer.displayName = 'EmblaThumbsContainer'
EmblaThumb.displayName = 'EmblaThumb'
EmblaButtonPrev.displayName = 'EmblaButtonPrev'
EmblaButtonNext.displayName = 'EmblaButtonNext'

export {
  EmblaCarousel,
  EmblaViewport,
  EmblaContainer,
  EmblaSlide,
  EmblaThumbsContainer,
  EmblaThumb,
  EmblaButtonPrev,
  EmblaButtonNext
}
