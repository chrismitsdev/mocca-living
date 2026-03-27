'use client'

import useEmblaCarousel from 'embla-carousel-react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

type EmblaApi = ReturnType<typeof useEmblaCarousel>[1]

interface CarouselContextProps {
  emblaRef: ReturnType<typeof useEmblaCarousel>[0]
  emblaApi: EmblaApi
  selectedSnap: number
  prevButtonDisabled: boolean
  nextButtonDisabled: boolean
  handleScrollPrev: () => void
  handleScrollNext: () => void
  handleScrollTo: (index: number) => void
}

interface CarouselProviderProps extends React.PropsWithChildren {
  options: Parameters<typeof useEmblaCarousel>[0]
  plugins: Parameters<typeof useEmblaCarousel>[1]
}

const CarouselContext = createContext<CarouselContextProps | null>(null)

function CarouselProvider({options, plugins, children}: CarouselProviderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins)
  const [selectedSnap, setSelectedSnap] = useState(0)
  const [prevButtonDisabled, setPrevButtonDisabled] = useState(true)
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true)

  const stopAutoplay = useCallback(() => {
    if (!emblaApi) return

    emblaApi.plugins()?.autoplay?.stop()
  }, [emblaApi])

  const handleScrollPrev = useCallback(() => {
    if (!emblaApi) return

    stopAutoplay()
    emblaApi.scrollPrev()
  }, [emblaApi, stopAutoplay])

  const handleScrollNext = useCallback(() => {
    if (!emblaApi) return

    stopAutoplay()
    emblaApi.scrollNext()
  }, [emblaApi, stopAutoplay])

  const handleScrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return

      stopAutoplay()
      emblaApi.scrollTo(index)
    },
    [emblaApi, stopAutoplay]
  )

  const handleSelect = useCallback((emblaApi: EmblaApi) => {
    if (!emblaApi) return

    setSelectedSnap(emblaApi.selectedScrollSnap())
  }, [])

  const handleDisablingButtons = useCallback((emblaApi: EmblaApi) => {
    if (!emblaApi) return

    setPrevButtonDisabled(!emblaApi.canScrollPrev())
    setNextButtonDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    handleSelect(emblaApi)
    handleDisablingButtons(emblaApi)

    emblaApi.on('reInit', handleSelect)
    emblaApi.on('reInit', handleDisablingButtons)
    emblaApi.on('select', handleSelect)
    emblaApi.on('select', handleDisablingButtons)

    return () => {
      emblaApi.off('reInit', handleSelect)
      emblaApi.off('reInit', handleDisablingButtons)
      emblaApi.off('select', handleSelect)
      emblaApi.off('select', handleDisablingButtons)
    }
  }, [emblaApi, handleSelect, handleDisablingButtons])

  const contextValue = useMemo(() => {
    return {
      emblaRef,
      emblaApi,
      selectedSnap,
      prevButtonDisabled,
      nextButtonDisabled,
      handleScrollPrev,
      handleScrollNext,
      handleScrollTo
    }
  }, [
    emblaRef,
    emblaApi,
    selectedSnap,
    prevButtonDisabled,
    nextButtonDisabled,
    handleScrollPrev,
    handleScrollNext,
    handleScrollTo
  ])

  return (
    <CarouselContext.Provider value={contextValue}>
      {children}
    </CarouselContext.Provider>
  )
}

function useCarousel() {
  const context = useContext(CarouselContext)

  if (!context) {
    throw new Error('useCarousel must be used within a EmblaProvider')
  }

  return context
}

export {CarouselContext, CarouselProvider, useCarousel}
