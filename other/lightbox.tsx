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
import {ArrowLeftIcon, ArrowRightIcon, XIcon, ExpandIcon} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {LightboxContext, useLightboxContext} from '@/context/lightbox-context'
import {cn, shimmer, toBase64} from '#/lib/utils'

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
      className={cn('grid', className)}
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
  withOverlay = true
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
    draggable = false,
    placeholder = slide?.blurDataURL
      ? `data:image/svg+xml;base64,${toBase64(shimmer(slide.width, slide.height))}`
      : undefined,
    ...restImageProps
  } = imageProps || {}

  return (
    <div
      className={cn(
        'relative cursor-grab active:cursor-grabbing',
        withOverlay &&
          'before:absolute before:inset-0 hover:before:bg-black/70 before:duration-200 cursor-pointer active:cursor-pointer group',
        className
      )}
      onClick={() => handleOpenImage(slides.findIndex(({src}) => src === slide.src))}
    >
      <Image
        src={slide}
        alt={alt}
        draggable={draggable}
        placeholder={placeholder}
        {...restImageProps}
      />
      {withOverlay && (
        <span className='hidden absolute inset-0 group-hover:flex items-center justify-center'>
          <ExpandIcon
            className='text-primary-foreground'
            size={32}
          />
        </span>
      )}
    </div>
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

function Lightbox({controller, ...props}: React.ComponentProps<typeof YetAnotherReactLightbox>) {
  const {slides, selectedIndex, setSelectedIndex} = useLightboxContext()
  const ref = React.useRef<ControllerRef | null>(null)
  const closeButtonKey = React.useId()
  const isOpen = selectedIndex >= 0

  return (
    <YetAnotherReactLightbox
      slides={slides}
      index={selectedIndex}
      controller={{ref, ...controller}}
      open={isOpen}
      close={() => setSelectedIndex(-1)}
      render={{
        slide: ({slide}) =>
          LightboxImage({
            slide,
            withOverlay: false,
            imageProps: {loading: 'eager', alt: '', className: 'rounded'}
          }),
        buttonPrev: () => (
          <LightboxButton
            className='absolute left-3'
            onClick={() => ref.current?.prev()}
          >
            <ArrowLeftIcon size={24} />
          </LightboxButton>
        ),
        buttonNext: () => (
          <LightboxButton
            className='absolute right-3'
            onClick={() => ref.current?.next()}
          >
            <ArrowRightIcon size={24} />
          </LightboxButton>
        ),
        buttonClose: () => (
          <LightboxButton
            key={closeButtonKey}
            variant='error'
            onClick={() => ref.current?.close()}
          >
            <XIcon size={24} />
          </LightboxButton>
        )
      }}
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
