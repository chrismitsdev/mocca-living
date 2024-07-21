import * as React from 'react'
import useEmblaCarousel from 'embla-carousel-react'

type CarouselContextType = {
  emblaRef: ReturnType<typeof useEmblaCarousel>['0']
  emblaApi: ReturnType<typeof useEmblaCarousel>['1']
  onPrevButtonClick: () => void
  onNextButtonClick: () => void
  onDotButtonClick: (index: number) => void
  selectedIndex: number
  scrollSnaps: number[]
}

const CarouselContext = React.createContext<CarouselContextType | null>(null)

function useCarouselContext() {
  const carouselContext = React.useContext(CarouselContext)

  if (!carouselContext) {
    throw new Error(
      'useCarouselContext has to be used within <CarouselContext.Provider>'
    )
  }

  return carouselContext
}

export {CarouselContext, useCarouselContext}