import Image from 'next/image'
import {
  Carousel,
  CarouselViewport,
  CarouselContainer,
  CarouselSlide,
  CarouselPrevButton,
  CarouselNextButton,
  CarouselDots
} from '@/components/ui/carousel'
import {Button} from '@/components/ui/button'
import {ArrowLeftIcon, ArrowRightIcon} from '@radix-ui/react-icons'
import * as outdoorImages from '#/public/images/outdoor'

const images = Object.values(outdoorImages)

function HomeCarousel() {
  return (
    <Carousel autoPlay>
      <CarouselViewport className='h-[calc(100svh-128px)]'>
        <CarouselContainer className='h-full'>
          {images.map((image, i) => (
            <CarouselSlide key={image.src}>
              <Image
                className='w-full h-full object-cover'
                src={image}
                alt={`Carousel image ${i + 1}`}
                priority
              />
            </CarouselSlide>
          ))}
        </CarouselContainer>
      </CarouselViewport>
      <CarouselPrevButton className='!absolute top-1/2 left-2 -translate-y-1/2'>
        <Button size='icon-small'>
          <ArrowLeftIcon
            width={24}
            height={24}
          />
        </Button>
      </CarouselPrevButton>
      <CarouselNextButton className='!absolute top-1/2 right-2 -translate-y-1/2'>
        <Button size='icon-small'>
          <ArrowRightIcon
            width={24}
            height={24}
          />
        </Button>
      </CarouselNextButton>
      <div className='px-4 py-3 absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/30 backdrop-blur-sm rounded-full'>
        <CarouselDots />
      </div>
    </Carousel>
  )
}

HomeCarousel.displayName = 'HomeCarousel'

export {HomeCarousel}
