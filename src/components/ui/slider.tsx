'use client'

import {Range, Root, Thumb, Track} from '@radix-ui/react-slider'

function Slider({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Root>) {
  return (
    <Root
      className='relative block-5 w-full flex items-center touch-none select-none'
      {...props}
    >
      <Track className='relative h-1 grow rounded-full bg-surface-5'>
        <Range className='absolute h-full rounded-full bg-primary' />
      </Track>
      <Thumb
        aria-label='Volume'
        className='block size-5 rounded-[10px] bg-primary'
      />
    </Root>
  )
}

Slider.displayName = 'Slide'

export {Slider}
