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
import * as outdoorImages from '#/public/images/outdoors'

function HomeCarousel() {
  return (
    <Carousel className='space-y-2' autoPlay>
      <CarouselViewport>
        <CarouselContainer>
          {Object.values(outdoorImages).slice(0, 8).map((image, i) => (
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
      <div className='grid grid-cols-[auto,1fr]'>
        <div className='space-x-2'>
          <CarouselPrevButton>
            <Button size='icon-small'>
              <ArrowLeftIcon width={16} height={16} />
            </Button>
          </CarouselPrevButton>
          <CarouselNextButton>
            <Button size='icon-small'>
              <ArrowRightIcon width={16} height={16} />
            </Button>
          </CarouselNextButton>
        </div>
        <CarouselDots className='justify-end' />
      </div>
    </Carousel>
  )
}

HomeCarousel.displayName = 'HomeCarousel'

export {HomeCarousel}