'use client'

import * as React from 'react'
import {Root, Thumb} from '@radix-ui/react-switch'
import {cn} from '#/lib/utils'

const Switch = React.forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root>
>(({className, ...props}, ref) => (
  <Root
    className={cn(
      'h-6 w-11 inline-flex items-center shrink-0 bg-surface-1 border-2 rounded-full cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-checked:bg-primary',
      className
    )}
    ref={ref}
    {...props}
  >
    <Thumb
      className={cn(
        'h-[18px] w-[18px] block bg-primary rounded-full pointer-events-none ring-0 transition-transform data-unchecked:translate-x-px data-checked:translate-x-[21px] data-checked:bg-surface-1'
      )}
    />
  </Root>
))

Switch.displayName = 'Switch'

export {Switch}
