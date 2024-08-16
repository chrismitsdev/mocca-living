import * as React from 'react'
import {type StaticImageData} from 'next/image'

type FramerCarouselContextType = {
  currentIndex: number
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
  inactiveThumbnailRatio: number
  activeThumbnailRatio: number
  activeThumbMargin: number
  thumbGap: number
  images: StaticImageData[]
}

const FramerCarouselContext = React.createContext<FramerCarouselContextType | null>(null)

function useCarouselContext() {
  const context = React.useContext(FramerCarouselContext)

  if (!context) {
    throw new Error('useFramerCarousel must be used within a <CarouselProvider>')
  }

  return context
}

export {FramerCarouselContext, useCarouselContext}
