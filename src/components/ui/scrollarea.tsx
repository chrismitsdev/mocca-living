'use client'

import * as React from 'react'
import {
  Root,
  Viewport,
  Scrollbar,
  Thumb,
  Corner
} from '@radix-ui/react-scroll-area'
import {cn} from '#/lib/utils'

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root>
>(({className, ...props}, ref) => (
  <Root
    className={cn('relative overflow-hidden', className)}
    ref={ref}
    {...props}
  />
))

const ScrollAreaViewport = React.forwardRef<
  React.ElementRef<typeof Viewport>,
  React.ComponentPropsWithoutRef<typeof Viewport>
>(({className, ...props}, ref) => (
  <Viewport
    className={cn('h-full w-full rounded-[inherit]', className)}
    ref={ref}
    {...props}
  />
))

const ScrollAreaBar = React.forwardRef<
  React.ElementRef<typeof Scrollbar>,
  React.ComponentPropsWithoutRef<typeof Scrollbar>
>(({className, orientation = 'vertical', ...props}, ref) => (
  <Scrollbar
    className={cn(
      'flex touch-none select-none transition-colors',
      orientation === 'vertical' && 'h-full w-2.5 p-px',
      orientation === 'horizontal' && 'h-2.5 flex-col p-px',
      className
    )}
    orientation={orientation}
    ref={ref}
    {...props}
  >
    <Thumb className='relative flex-1 bg-border-muted rounded-full active:bg-border hover:bg-border transition-colors' />
  </Scrollbar>
))

const ScrollAreaCorner = Corner

ScrollArea.displayName = 'ScrollArea'
ScrollAreaViewport.displayName = 'ScrollAreaViewport'
ScrollAreaBar.displayName = 'ScrollAreaBar'
ScrollAreaCorner.displayName = 'ScrollAreaCorner'

export {ScrollArea, ScrollAreaViewport, ScrollAreaBar, ScrollAreaCorner}
