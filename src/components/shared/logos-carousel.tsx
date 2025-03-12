'use client'

import Autoscroll from 'embla-carousel-auto-scroll'
import {
  EmblaCarousel,
  EmblaViewport,
  EmblaContainer,
  EmblaSlide
} from '@/src/components/ui/embla-carousel'
import {YuppiiLogo} from '@/src/components/logos/yuppii-logo'
import {StartPilatesLogo} from '@/src/components/logos/startpilates-logo'
import {CocoMatLogo} from '@/src/components/logos/cocomat-logo'

const LogosCarousel: React.FC = () => {
  return (
    <div className='order-1 relative max-w-sm before:absolute before:z-[1] before:left-0 before:inset-y-0 before:w-10 before:bg-gradient-to-l before:from-transparent before:to-surface-2 after:absolute after:z-[1] after:right-0 after:inset-y-0 after:w-10 after:bg-gradient-to-r after:from-transparent after:to-surface-2 sm:order-2'>
      <EmblaCarousel plugins={[Autoscroll({stopOnInteraction: false})]}>
        <EmblaViewport>
          <EmblaContainer>
            <EmblaSlide className='mr-0 flex justify-center items-center'>
              <a
                href='https://yuppii.gr/'
                target='_blank'
              >
                <YuppiiLogo className='w-full' />
              </a>
            </EmblaSlide>
            <EmblaSlide className='mr-0 flex justify-center items-center'>
              <a
                href='https://startpilates.gr/'
                target='_blank'
              >
                <StartPilatesLogo className='w-full' />
              </a>
            </EmblaSlide>
            <EmblaSlide className='mr-0 flex justify-center items-center'>
              <CocoMatLogo className='w-full' />
            </EmblaSlide>
          </EmblaContainer>
        </EmblaViewport>
      </EmblaCarousel>
    </div>
  )
}

LogosCarousel.displayName = 'LogosCarousel'

export {LogosCarousel}
