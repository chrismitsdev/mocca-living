import Image, {type StaticImageData} from 'next/image'
import {cn} from '@/src/lib/utils'
import {toBase64} from './base64'
import {shimmer} from './shimmer'

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
      className={cn('block-full inline-full object-cover', className)}
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

export {CustomImage}
