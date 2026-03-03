'use client'

import {
  Corner,
  Root,
  Scrollbar,
  Thumb,
  Viewport
} from '@radix-ui/react-scroll-area'
import {cn} from '@/src/lib/utils'

const ScrollAreaCorner = Corner

function ScrollArea({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Root>) {
  return (
    <Root
      className={cn('relative overflow-hidden', className)}
      {...props}
    />
  )
}

function ScrollAreaViewport({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Viewport>) {
  return (
    <Viewport
      className={cn('h-full w-full rounded-[inherit]', className)}
      {...props}
    />
  )
}

function ScrollAreaBar({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentPropsWithRef<typeof Scrollbar>) {
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

ScrollArea.displayName = 'ScrollArea'
ScrollAreaViewport.displayName = 'ScrollAreaViewport'
ScrollAreaBar.displayName = 'ScrollAreaBar'
ScrollAreaCorner.displayName = 'ScrollAreaCorner'

export {ScrollArea, ScrollAreaViewport, ScrollAreaBar, ScrollAreaCorner}
