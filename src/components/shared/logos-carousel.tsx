'use client'

import Autoscroll from 'embla-carousel-auto-scroll'
import Image from 'next/image'
import lighthouseLogo from '@/public/logos/christmas-lighthouse-logo.png'
import cocomatLogo from '@/public/logos/cocomat-logo.png'
import startPilatesLogo from '@/public/logos/start-pilates-logo.png'
import yuppiiLogo from '@/public/logos/yuppii-logo.png'
import {
  Carousel,
  CarouselViewport,
  Slide,
  SlidesContainer
} from '@/src/components/ui/carousel'

function LogosCarousel() {
  return (
    <div className='order-1 relative before:absolute before:z-1 before:left-0 before:inset-y-0 before:w-10 before:bg-linear-to-l before:from-transparent before:to-surface-2 after:absolute after:z-auto after:right-0 after:inset-y-0 after:w-10 after:bg-linear-to-r after:from-transparent after:to-surface-2 sm:max-w-sm sm:order-2'>
      <Carousel plugins={[Autoscroll({stopOnInteraction: false})]}>
        <CarouselViewport>
          <SlidesContainer>
            <Slide>
              <a
                aria-label='Visit Yuppii Luna Park website (opens in new tab)'
                href='https://www.yuppii.gr/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Image
                  className='mx-auto'
                  src={yuppiiLogo}
                  alt='Yuppii Luna Park logo'
                />
              </a>
            </Slide>
            <Slide>
              <a
                aria-label='Visit Start Pilates website (opens in new tab)'
                href='https://www.startpilates.gr'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Image
                  className='mx-auto'
                  src={startPilatesLogo}
                  alt='Start Pilates logo'
                />
              </a>
            </Slide>
            <Slide>
              <a
                aria-label='Visit Christmas Lighthouse website (opens in new tab)'
                href='https://www.thechristmaslighthouse.gr/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Image
                  className='mx-auto'
                  src={lighthouseLogo}
                  alt='The Christmas Lighthouse logo'
                />
              </a>
            </Slide>
            <Slide>
              <Image
                className='mx-auto'
                src={cocomatLogo}
                alt='Coco-mat logo'
              />
            </Slide>
          </SlidesContainer>
        </CarouselViewport>
      </Carousel>
    </div>
  )
}

LogosCarousel.displayName = 'LogosCarousel'

export {LogosCarousel}
