import * as React from 'react'
import Image, {type StaticImageData} from 'next/image'
import {shimmer, toBase64} from '@/src/lib/utils'

interface CustomImageProps
  extends Omit<React.ComponentPropsWithRef<typeof Image>, 'src'> {
  src: StaticImageData
}

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  draggable = false,
  ...props
}) => {
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

CustomImage.displayName = 'CustomIamge'

export {CustomImage}
