'use client'

import * as React from 'react'
import {
  Root,
  Trigger,
  Content,
  Portal,
  Close,
  Anchor
} from '@radix-ui/react-popover'
import {cn} from '#/lib/utils'

const Popover = Root
const PopoverPortal = Portal
const PopoverTrigger = Trigger
const PopoverAnchor = Anchor
const PopoverClose = Close

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(({className, align = 'center', sideOffset = 6, ...props}, ref) => (
  <Content
    className={cn(
      'p-4 z-50 bg-surface-1 border border-primary rounded shadow outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-top:slide-in-from-bottom-2 data-right:slide-in-from-left-2 data-bottom:slide-in-from-top-2 data-left:slide-in-from-right-2',
      className
    )}
    align={align}
    sideOffset={sideOffset}
    ref={ref}
    {...props}
  />
))

Popover.displayName = 'Popover'
PopoverTrigger.displayName = 'PopoverTrigger'
PopoverAnchor.displayName = 'PopoverAnchor'
PopoverPortal.displayName = 'PopoverPortal'
PopoverContent.displayName = 'PopoverContent'
PopoverClose.displayName = 'PopoverClose'

export {
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  PopoverPortal,
  PopoverContent,
  PopoverClose
}
