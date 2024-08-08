'use client'

import 'yet-another-react-lightbox/styles.css'
import * as React from 'react'
import Image, {type StaticImageData, type ImageProps} from 'next/image'
import {
  type Slide,
  type ControllerRef,
  type RenderSlideProps,
  isImageSlide,
  Lightbox as YetAnotherReactLightbox
} from 'yet-another-react-lightbox'
import {cn} from '#/lib/utils'
import {Button} from '@/components/ui/button'
import {ArrowLeftIcon, ArrowRightIcon, Cross1Icon, EnterFullScreenIcon} from '@radix-ui/react-icons'
import {LightboxContext, useLightboxContext} from '@/context/lightbox-context'

function LightboxProvider({
  slides,
  startingIndex = -1,
  children
}: React.PropsWithChildren<{
  slides: StaticImageData[]
  startingIndex?: number
}>) {
  const [selectedIndex, setSelectedIndex] = React.useState<number>(startingIndex)

  return (
    <LightboxContext.Provider
      value={{
        slides,
        selectedIndex,
        setSelectedIndex
      }}
    >
      {children}
    </LightboxContext.Provider>
  )
}

function LightboxThumbnails({className, ...props}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn('grid grid-cols-2 gap-4 sm:grid-cols-6', className)}
      {...props}
    />
  )
}

function isNextJsImage(slide: Slide): slide is StaticImageData {
  return isImageSlide(slide) && typeof slide.width === 'number' && typeof slide.height === 'number'
}

function LightboxImage({
  slide,
  className,
  imageProps,
  withOverlay = false
}: Partial<RenderSlideProps> &
  React.ComponentPropsWithoutRef<'div'> & {
    imageProps?: Omit<ImageProps, 'src' | 'width' | 'height'>
    withOverlay?: boolean
  }) {
  const {slides, selectedIndex, setSelectedIndex} = useLightboxContext()

  if (!slide || !isNextJsImage(slide)) {
    return null
  }

  function handleOpenImage(index: number) {
    if (selectedIndex >= 0) return
    setSelectedIndex(index)
  }

  const {
    alt = '',
    loading = 'eager',
    draggable = 'false',
    placeholder = slide?.blurDataURL ? 'blur' : undefined,
    ...restImageProps
  } = imageProps || {}

  return (
    <div
      className={cn(
        'relative',
        withOverlay &&
          'before:absolute before:inset-0 hover:before:bg-black/70 before:duration-200 group',
        className
      )}
      onClick={() => handleOpenImage(slides.findIndex((s) => s.src === slide.src))}
    >
      <Image
        src={slide}
        alt={alt}
        loading={loading}
        draggable={draggable}
        placeholder={placeholder}
        {...restImageProps}
      />
      {withOverlay && (
        <span className='hidden absolute inset-0 group-hover:flex items-center justify-center'>
          <EnterFullScreenIcon
            className='text-primary-foreground'
            width={32}
            height={32}
          />
        </span>
      )}
    </div>
  )
}

function Lightbox({controller, ...props}: React.ComponentProps<typeof YetAnotherReactLightbox>) {
  const {slides, selectedIndex, setSelectedIndex} = useLightboxContext()
  const ref = React.useRef<ControllerRef | null>(null)
  const closeButtonKey = React.useId()
  const {closeOnBackdropClick = true, ...restController} = controller || {}
  const isOpen = selectedIndex >= 0

  return (
    <YetAnotherReactLightbox
      slides={slides}
      index={selectedIndex}
      controller={{ref, closeOnBackdropClick, ...restController}}
      open={isOpen}
      close={() => setSelectedIndex(-1)}
      render={{
        slide: LightboxImage,
        buttonPrev: () => (
          <LightboxButton
            className='absolute left-3'
            onClick={() => ref.current?.prev()}
          >
            <ArrowLeftIcon
              width={24}
              height={24}
            />
          </LightboxButton>
        ),
        buttonNext: () => (
          <LightboxButton
            className='absolute right-3'
            onClick={() => ref.current?.next()}
          >
            <ArrowRightIcon
              width={24}
              height={24}
            />
          </LightboxButton>
        ),
        buttonClose: () => (
          <LightboxButton
            key={closeButtonKey}
            variant='error'
            onClick={() => ref.current?.close()}
          >
            <Cross1Icon
              width={24}
              height={24}
            />
          </LightboxButton>
        )
      }}
      {...props}
    />
  )
}

function LightboxButton({
  variant = 'primary',
  size = 'icon-small',
  ...props
}: React.ComponentPropsWithoutRef<typeof Button>) {
  return (
    <Button
      variant={variant}
      size={size}
      {...props}
    />
  )
}

LightboxProvider.displayName = 'LightboxProvider'
LightboxThumbnails.displayName = 'LightboxThumbnails'
LightboxImage.displayName = 'LightboxImage'
Lightbox.displayName = 'Lightbox'
LightboxButton.displayName = 'LightboxButton'

export {LightboxProvider, LightboxThumbnails, LightboxImage, Lightbox}
