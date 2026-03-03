import Image, {type StaticImageData} from 'next/image'
import {shimmer, toBase64} from '@/src/lib/utils'

interface CustomImageProps
  extends Omit<React.ComponentPropsWithRef<typeof Image>, 'src'> {
  src: StaticImageData
}

function CustomImage({
  src,
  alt,
  draggable = false,
  ...props
}: CustomImageProps) {
  return (
    <Image
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
