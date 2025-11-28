'use client'

import {
  Anchor,
  Close,
  Content,
  Portal,
  Root,
  Trigger
} from '@radix-ui/react-popover'
import type * as React from 'react'
import {cn} from '@/src/lib/utils'

const Popover = Root
const PopoverPortal = Portal
const PopoverTrigger = Trigger
const PopoverAnchor = Anchor
const PopoverClose = Close

const PopoverContent: React.FC<React.ComponentPropsWithRef<typeof Content>> = ({
  className,
  sideOffset = 6,
  align = 'center',
  ...props
}) => (
  <Content
    className={cn(
      'z-50 bg-surface-1 border border-primary rounded shadow outline-none data-open:data-top:animate-slide-top-show data-open:data-right:animate-slide-right-show data-open:data-bottom:animate-slide-bottom-show data-open:data-left:animate-slide-left-show data-closed:data-top:animate-slide-top-hide data-closed:data-right:animate-slide-right-hide data-closed:data-bottom:animate-slide-bottom-hide data-closed:data-left:animate-slide-left-hide',
      className
    )}
    sideOffset={sideOffset}
    align={align}
    {...props}
  />
)

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
