import Image from 'next/image'
import {
  Carousel,
  CarouselViewport,
  CarouselContainer,
  CarouselSlide,
  CarouselPrevButton,
  CarouselNextButton,
  CarouselDots
} from '#/other/carousel'
import {Button} from '@/components/ui/button'
import {ArrowLeftIcon, ArrowRightIcon} from '@radix-ui/react-icons'
import {shimmer, toBase64} from '#/lib/utils'
import * as outdoorImages from '#/public/images/outdoor'

const images = Object.values(outdoorImages)

function HomeCarousel() {
  return (
    <Carousel autoPlay>
      <CarouselViewport className='h-[100svh]'>
        <CarouselContainer className='h-full'>
          {images.map((image, i) => (
            <CarouselSlide
              key={image.src}
              className='mr-2'
            >
              <Image
                className='w-full h-full object-cover'
                src={image}
                placeholder={`data:image/svg+xml;base64,${toBase64(
                  shimmer(image.width, image.height)
                )}`}
                draggable={false}
                alt={`Carousel image ${i + 1}`}
              />
            </CarouselSlide>
          ))}
        </CarouselContainer>
      </CarouselViewport>
      <CarouselPrevButton className='!absolute top-1/2 left-2 -translate-y-1/2'>
        <Button
          variant='primary-alt'
          size='icon-small'
        >
          <ArrowLeftIcon
            width={24}
            height={24}
          />
        </Button>
      </CarouselPrevButton>
      <CarouselNextButton className='!absolute top-1/2 right-2 -translate-y-1/2'>
        <Button
          variant='primary-alt'
          size='icon-small'
        >
          <ArrowRightIcon
            width={24}
            height={24}
          />
        </Button>
      </CarouselNextButton>
      <div className='px-4 py-[9px] absolute bottom-2 left-1/2 -translate-x-1/2 bg-[rgb(0,0,0)]/[0.24] border border-[rgb(0,0,0)]/[0.08] rounded-full shadow-[0_0_12px_-4px_rgba(69,50,39,0.24)] backdrop-blur-sm'>
        <CarouselDots />
      </div>
    </Carousel>
  )
}

HomeCarousel.displayName = 'HomeCarousel'

export {HomeCarousel}
