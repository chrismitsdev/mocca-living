'use client'

import {
  Corner,
  Root,
  Scrollbar,
  Thumb,
  Viewport
} from '@radix-ui/react-scroll-area'
import {cn} from '@/src/lib/utils'

const ScrollareaCorner = Corner

function Scrollarea({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Root>) {
  return (
    <Root
      className={cn('overflow-hidden', className)}
      {...props}
    />
  )
}

function ScrollareaViewport({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Viewport>) {
  return (
    <Viewport
      className={cn('size-full', className)}
      {...props}
    />
  )
}

function ScrollareaBar({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Scrollbar>) {
  return (
    <Scrollbar
      className={cn(
        'p-0.5 flex touch-none select-none transition-colors data-vertical:h-full data-vertical:w-2.5 data-horizontal:flex-col data-horizontal:h-2.5',
        className
      )}
      {...props}
    >
      <Thumb className='flex-1 relative rounded-full bg-surface-4 transition-colors hover:bg-surface-5' />
    </Scrollbar>
  )
}

Scrollarea.displayName = 'Scrollarea'
ScrollareaViewport.displayName = 'ScrollareaViewport'
ScrollareaBar.displayName = 'ScrollareaBar'
ScrollareaCorner.displayName = 'ScrollareaCorner'

export {Scrollarea, ScrollareaBar, ScrollareaCorner, ScrollareaViewport}
