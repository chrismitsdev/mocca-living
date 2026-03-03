import type useEmblaCarousel from 'embla-carousel-react'
import {createContext, useContext} from 'react'

interface EmblaContextProps {
  emblaRef: ReturnType<typeof useEmblaCarousel>[0]
  emblaApi: ReturnType<typeof useEmblaCarousel>[1]
  selectedIndex: number
  onPrevButtonClick(): void
  onNextButtonClick(): void
  onThumbButtonClick(index: number): void
}

const EmblaContext = createContext<EmblaContextProps | null>(null)

function useEmblaContext() {
  const context = useContext(EmblaContext)

  if (!context) {
    throw new Error('useEmblaContext must be used within a EmblaProvider')
  }

  return context
}

export {EmblaContext, useEmblaContext}
