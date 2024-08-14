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
import {Container} from '@/components/shared/container'
import * as outdoorImages from '#/public/images/outdoor'

const images = Object.values(outdoorImages)

function HomeCarousel() {
  return (
    <Container>
      <Carousel
        className='p-2 space-y-2 bg-surface-2 rounded shadow-medium sm:p-4'
        autoPlay
      >
        <CarouselViewport>
          <CarouselContainer>
            {images.slice(0, 8).map((image, i) => (
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
        <div className='flex gap-2'>
          <CarouselPrevButton className='shrink-0'>
            <Button size='icon-small'>
              <ArrowLeftIcon
                width={16}
                height={16}
              />
            </Button>
          </CarouselPrevButton>
          <CarouselDots className='grow' />
          <CarouselNextButton className='shrink-0'>
            <Button size='icon-small'>
              <ArrowRightIcon
                width={16}
                height={16}
              />
            </Button>
          </CarouselNextButton>
        </div>
        {/* <div className='grid grid-cols-[auto,1fr]'>
          <div className='space-x-2'>
            <CarouselPrevButton>
              <Button size='icon-small'>
                <ArrowLeftIcon
                  width={16}
                  height={16}
                />
              </Button>
            </CarouselPrevButton>
            <CarouselNextButton>
              <Button size='icon-small'>
                <ArrowRightIcon
                  width={16}
                  height={16}
                />
              </Button>
            </CarouselNextButton>
          </div>
          <CarouselDots className='justify-end' />
        </div> */}
      </Carousel>
    </Container>
  )
}

HomeCarousel.displayName = 'HomeCarousel'

export {HomeCarousel}
