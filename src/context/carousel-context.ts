import type useEmblaCarousel from 'embla-carousel-react'
import {createContext, useContext} from 'react'

interface CarouselContextProps {
  emblaRef: ReturnType<typeof useEmblaCarousel>[0]
  emblaApi: ReturnType<typeof useEmblaCarousel>[1]
  selectedIndex: number
  onPrevButtonClick(): void
  onNextButtonClick(): void
  onThumbButtonClick(index: number): void
}

const CarouselContext = createContext<CarouselContextProps | null>(null)

function useCarouselContext() {
  const context = useContext(CarouselContext)

  if (!context) {
    throw new Error('useCarouselContext must be used within a EmblaProvider')
  }

  return context
}

export {CarouselContext, useCarouselContext}
