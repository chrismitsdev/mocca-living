'use client'

import {
  Corner,
  Root,
  Scrollbar,
  Thumb,
  Viewport
} from '@radix-ui/react-scroll-area'
import type * as React from 'react'
import {cn} from '@/src/lib/utils'

const ScrollArea: React.FC<React.ComponentPropsWithRef<typeof Root>> = ({
  className,
  ...props
}) => {
  return (
    <Root
      className={cn('relative overflow-hidden', className)}
      {...props}
    />
  )
}

const ScrollAreaViewport: React.FC<
  React.ComponentPropsWithRef<typeof Viewport>
> = ({className, ...props}) => {
  return (
    <Viewport
      className={cn('h-full w-full rounded-[inherit]', className)}
      {...props}
    />
  )
}

const ScrollAreaBar: React.FC<
  React.ComponentPropsWithRef<typeof Scrollbar>
> = ({className, orientation = 'vertical', ...props}) => {
  return (
    <Scrollbar
      className={cn(
        'flex touch-none select-none transition-colors',
        orientation === 'vertical' && 'h-full w-2.5 p-px',
        orientation === 'horizontal' && 'h-2.5 flex-col p-px',
        className
      )}
      orientation={orientation}
      {...props}
    >
      <Thumb className='relative flex-1 bg-border-muted rounded-full active:bg-border hover:bg-border transition-colors' />
    </Scrollbar>
  )
}

const ScrollAreaCorner = Corner

ScrollArea.displayName = 'ScrollArea'
ScrollAreaViewport.displayName = 'ScrollAreaViewport'
ScrollAreaBar.displayName = 'ScrollAreaBar'
ScrollAreaCorner.displayName = 'ScrollAreaCorner'

export {ScrollArea, ScrollAreaViewport, ScrollAreaBar, ScrollAreaCorner}
