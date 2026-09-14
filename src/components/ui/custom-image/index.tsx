import Image, {type StaticImageData} from 'next/image'
import {cn} from '@/src/lib/utils'
import {loader} from './loader'
import {toBase64} from './toBase64'

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
        loader(src.width, src.height)
      )}`}
      src={src}
      alt={alt}
      draggable={draggable}
      {...props}
    />
  )
}

export {CustomImage}
