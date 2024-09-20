/* eslint-disable no-restricted-imports */

import * as React from 'react'
import Image, {type StaticImageData} from 'next/image'
import {shimmer, toBase64} from '#/lib/utils'

const CustomImage = React.forwardRef<
  React.ElementRef<typeof Image>,
  Omit<React.ComponentPropsWithoutRef<typeof Image>, 'src'> & {
    src: StaticImageData
  }
>(({src, alt, ...props}, ref) => {
  return (
    <Image
      placeholder={`data:image/svg+xml;base64,${toBase64(
        shimmer(src.width, src.height)
      )}`}
      src={src}
      alt={alt}
      ref={ref}
      {...props}
    />
  )
})

CustomImage.displayName = 'CustomImage'

export {CustomImage}
