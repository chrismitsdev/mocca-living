'use client'

import * as React from 'react'
import Image, {type StaticImageData} from 'next/image'
import {motion, AnimatePresence, MotionConfig} from 'framer-motion'
import {ChevronLeftIcon, ChevronRightIcon} from '@radix-ui/react-icons'
import {Button} from '@/components/ui/button'
import {FramerCarouselContext, useCarouselContext} from '@/context/carousel-context'
import {cn} from '#/lib/utils'
import {Typography} from './typography'

type CarouselProviderProps = {
  activeIndex?: number
  loop?: boolean
  inactiveThumbnailRatio?: number
  activeThumbnailRatio?: number
  activeThumbMargin?: number
  thumbGap?: number
  className?: string
  images: StaticImageData[]
  children: React.ReactNode
}

function CarouselProvider({
  activeIndex = 0,
  loop = false,
  inactiveThumbnailRatio = 1 / 3,
  activeThumbnailRatio = 3 / 2,
  activeThumbMargin = 12,
  thumbGap = 4,
  images,
  className,
  children,
  ...props
}: CarouselProviderProps) {
  const [currentIndex, setCurrentIndex] = React.useState(activeIndex)

  const contextValue = React.useMemo(
    function () {
      return {
        currentIndex,
        setCurrentIndex,
        loop,
        inactiveThumbnailRatio,
        activeThumbnailRatio,
        activeThumbMargin,
        thumbGap,
        images
      }
    },
    [
      currentIndex,
      loop,
      inactiveThumbnailRatio,
      activeThumbnailRatio,
      activeThumbMargin,
      thumbGap,
      images
    ]
  )

  return (
    <MotionConfig transition={{duration: 0.75, ease: [0.32, 0.72, 0, 1]}}>
      <FramerCarouselContext.Provider value={contextValue}>
        <div
          className={cn('relative h-[100svh] bg-black', className)}
          {...props}
        >
          {children}
        </div>
      </FramerCarouselContext.Provider>
    </MotionConfig>
  )
}

const CarouselRoot = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({className, ...props}, ref) => {
    return (
      <div
        className={cn('mx-auto h-full max-w-7xl flex-col flex justify-center', className)}
        ref={ref}
        {...props}
      />
    )
  }
)

const CarouselViewport = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({className, ...props}, ref) => {
    return (
      <div
        className={cn('relative overflow-hidden w-full', className)}
        ref={ref}
        {...props}
      />
    )
  }
)

const CarouselImageContainer = React.forwardRef<
  React.ElementRef<typeof motion.div>,
  React.ComponentPropsWithoutRef<typeof motion.div>
>(({className, initial = false, ...props}, ref) => {
  const {currentIndex} = useCarouselContext()

  return (
    <motion.div
      initial={initial}
      className={cn('flex will-change-transform', className)}
      animate={{x: `-${currentIndex * 100}%`}}
      ref={ref}
      {...props}
    />
  )
})

const CarouselImage = React.forwardRef<
  React.ElementRef<typeof Image>,
  React.ComponentPropsWithoutRef<typeof Image> & {
    index: number
  }
>(({className, src, alt, index, draggable = false, ...props}, ref) => {
  const {currentIndex} = useCarouselContext()

  return (
    <Image
      className={cn(
        'shrink-0 w-full h-full object-cover select-none ease-mocca duration-1000',
        currentIndex === index ? 'opacity-100' : 'opacity-10',
        className
      )}
      src={src}
      draggable={draggable}
      alt={alt}
      ref={ref}
      {...props}
    />
  )
})

const CarouselPrevButton = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button>
>(({className, variant = 'primary-alt', size = 'icon-normal', ...props}, ref) => {
  const {images, currentIndex, setCurrentIndex, loop} = useCarouselContext()

  function handlePrevImage() {
    if (loop && currentIndex === 0) {
      setCurrentIndex(images.length - 1)
    } else if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <AnimatePresence initial={false}>
      {(loop || currentIndex > 0) && (
        <Button
          className={cn('absolute left-2 top-1/2 -translate-y-1/2 transition-none', className)}
          variant={variant}
          size={size}
          onClick={handlePrevImage}
          asChild
          ref={ref}
          {...props}
        >
          <motion.button
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0, pointerEvents: 'none'}}
          >
            <ChevronLeftIcon
              width={24}
              height={24}
            />
          </motion.button>
        </Button>
      )}
    </AnimatePresence>
  )
})

const CarouselNextButton = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button>
>(({className, variant = 'primary-alt', size = 'icon-normal', ...props}, ref) => {
  const {images, currentIndex, setCurrentIndex, loop} = useCarouselContext()

  function handleNextImage() {
    if (loop && currentIndex + 1 === images.length) {
      setCurrentIndex(0)
    } else if (currentIndex + 1 < images.length) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  return (
    <AnimatePresence initial={false}>
      {(loop || currentIndex + 1 < images.length) && (
        <Button
          className={cn('absolute right-2 top-1/2 -translate-y-1/2 transition-none', className)}
          variant={variant}
          size={size}
          onClick={handleNextImage}
          asChild
          ref={ref}
          {...props}
        >
          <motion.button
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0, pointerEvents: 'none'}}
          >
            <ChevronRightIcon
              width={24}
              height={24}
            />
          </motion.button>
        </Button>
      )}
    </AnimatePresence>
  )
})

const CarouselThumbnailViewport = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>(({className, ...props}, ref) => (
  <div
    className={cn(
      'absolute bottom-6 inset-x-0 h-14 flex justify-center overflow-hidden',
      className
    )}
    ref={ref}
    {...props}
  />
))

const CarouselThumbnailContainer = React.forwardRef<
  React.ElementRef<typeof motion.div>,
  React.ComponentPropsWithoutRef<typeof motion.div>
>(({initial = false, className, ...props}, ref) => {
  const {activeThumbnailRatio, thumbGap, currentIndex, inactiveThumbnailRatio, activeThumbMargin} =
    useCarouselContext()

  return (
    <motion.div
      initial={initial}
      className={cn('flex h-[inherit]', className)}
      style={{
        aspectRatio: activeThumbnailRatio,
        gap: `${thumbGap}%`
      }}
      animate={{
        x: `-${
          currentIndex * 100 * (inactiveThumbnailRatio / activeThumbnailRatio) +
          activeThumbMargin +
          currentIndex * thumbGap
        }%`
      }}
      ref={ref}
      {...props}
    />
  )
})

const CarouselThumbnailButton = React.forwardRef<
  React.ElementRef<typeof motion.button>,
  React.ComponentPropsWithoutRef<typeof motion.button> & {
    index: number
  }
>(({initial = false, index, className, ...props}, ref) => {
  const {
    currentIndex,
    activeThumbnailRatio,
    activeThumbMargin,
    inactiveThumbnailRatio,
    setCurrentIndex
  } = useCarouselContext()

  return (
    <motion.button
      initial={initial}
      className={cn('shrink-0', className)}
      animate={currentIndex === index ? 'active' : 'inactive'}
      variants={{
        active: {
          aspectRatio: activeThumbnailRatio,
          marginLeft: `${activeThumbMargin}%`,
          marginRight: `${activeThumbMargin}%`,
          opacity: 1
        },
        inactive: {
          aspectRatio: inactiveThumbnailRatio,
          marginLeft: 0,
          marginRight: 0,
          opacity: 0.5
        }
      }}
      whileHover={{opacity: 1}}
      onClick={() => setCurrentIndex(index)}
      ref={ref}
      {...props}
    />
  )
})

const CarouselThumbnailImage = React.forwardRef<
  React.ElementRef<typeof Image>,
  React.ComponentPropsWithoutRef<typeof Image>
>(({className, src, alt = '', draggable = false, ...props}, ref) => (
  <Image
    className={cn('w-full h-full object-cover select-none', className)}
    src={src}
    draggable={draggable}
    alt={alt}
    ref={ref}
    {...props}
  />
))

const CarouselCount = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({className, ...props}, ref) => {
    const {currentIndex, images} = useCarouselContext()

    return (
      <div
        className={cn(
          'absolute top-2 left-2 flex items-center gap-2 text-primary-foreground p-1',
          className
        )}
        ref={ref}
        {...props}
      >
        <Typography variant='large'>{currentIndex + 1}</Typography>
        <Typography variant='large'>{'/'}</Typography>
        <Typography variant='large'>{images.length}</Typography>
      </div>
    )
  }
)

CarouselProvider.displayName = 'CarouselProvider'
CarouselRoot.displayName = 'CarouselRoot'
CarouselViewport.displayName = 'CarouselViewport'
CarouselImageContainer.displayName = 'CarouselImageContainer'
CarouselImage.displayName = 'CarouselImage'
CarouselPrevButton.displayName = 'CarouselPreviousButton'
CarouselNextButton.displayName = 'CarouselNextButton'
CarouselThumbnailViewport.displayName = 'CarouselThumbnailViewport'
CarouselThumbnailContainer.displayName = 'CarouselThumbnailContainer'
CarouselThumbnailButton.displayName = 'CarouselThumbnailButton'
CarouselThumbnailImage.displayName = 'CarouselThumbnailImage'
CarouselCount.displayName = 'CarouselCount'

export {
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
}
