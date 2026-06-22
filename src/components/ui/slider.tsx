'use client'

import {Slider as RadixSlider} from 'radix-ui'

function Slider({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof RadixSlider.Root>) {
  return (
    <RadixSlider.Root
      className='relative block-5 w-full flex items-center touch-none select-none'
      {...props}
    >
      <RadixSlider.Track className='relative h-1 grow rounded-full bg-surface-5'>
        <RadixSlider.Range className='absolute h-full rounded-full bg-primary' />
      </RadixSlider.Track>
      <RadixSlider.Thumb
        aria-label='Volume'
        className='block size-5 rounded-[10px] bg-primary'
      />
    </RadixSlider.Root>
  )
}

Slider.displayName = 'Slide'

export {Slider}
