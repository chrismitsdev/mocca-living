import Image, {type StaticImageData} from 'next/image'
import {cn} from '@/src/lib/utils'

interface CustomImageProps
  extends Omit<React.ComponentPropsWithRef<typeof Image>, 'src'> {
  src: StaticImageData
}

function CustomImage({
  className,
  src,
  alt,
  draggable = false,
  ...props
}: CustomImageProps) {
  return (
    <Image
      className={cn('w-full h-full object-cover', className)}
      placeholder={`data:image/svg+xml;base64,${toBase64(
        shimmer(src.width, src.height)
      )}`}
      src={src}
      alt={alt}
      draggable={draggable}
      {...props}
    />
  )
}

CustomImage.displayName = 'CustomImage'

export {CustomImage}

function shimmer(w: number, h: number) {
  return `
    <svg
      width='${w}'
      height='${h}'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      xmlns:xlink='http://www.w3.org/1999/xlink'
    >
      <defs>
        <linearGradient id='g'>
          <stop stop-color='#b1a082' offset='20%' />
          <stop stop-color='#9b8c71' offset='50%' />
          <stop stop-color='#b1a082' offset='70%' />
        </linearGradient>
      </defs>
      <rect width='${w}' height='${h}' fill='#b1a082' />
      <rect id="r" width='${w}' height='${h}' fill='url(#g)' />
      <animate
        xlink:href='#r'
        attributeName='x'
        from='-${w}'
        to='${w}'
        dur='1s'
        repeatCount='indefinite'
      />
    </svg>
  `
}

function toBase64(str: string) {
  return typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)
}
