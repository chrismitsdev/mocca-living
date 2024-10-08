'use client'

import * as React from 'react'
import {Root, Portal, Trigger, Content, Arrow} from '@radix-ui/react-hover-card'
import {cn} from '#/lib/utils'

const HoverCard = Root
const HoverCardPortal = Portal
const HoverCardTrigger = Trigger

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(
  (
    {className, align = 'center', sideOffset = 8, side = 'bottom', ...props},
    ref
  ) => (
    <Content
      className={cn(
        'p-6 max-w-lg z-50 bg-surface-2 rounded drop-shadow-medium outline-none data-open:animate-in data-open:fade-in-0 data-open:duration-750 data-closed:animate-out data-closed:fade-out-0 data-closed:duration-0 data-top:slide-in-from-bottom-2 data-right:slide-in-from-left-2 data-bottom:slide-in-from-top-2 data-left:slide-in-from-right-2 ease-mocca',
        className
      )}
      side={side}
      align={align}
      sideOffset={sideOffset}
      ref={ref}
      {...props}
    />
  )
)

const HoverCardArrow = React.forwardRef<
  React.ElementRef<typeof Arrow>,
  React.ComponentPropsWithoutRef<typeof Arrow>
>(({className, ...props}, ref) => (
  <Arrow
    className={cn('fill-surface-2 w-4 h-2', className)}
    ref={ref}
    {...props}
  />
))

HoverCard.displayName = 'HoverCard'
HoverCardTrigger.displayName = 'HoverCardTrigger'
HoverCardPortal.displayName = 'HoverCardPortal'
HoverCardContent.displayName = 'HoverCardContent'
HoverCardArrow.displayName = 'HoverCardArrow'

export {
  HoverCard,
  HoverCardTrigger,
  HoverCardPortal,
  HoverCardContent,
  HoverCardArrow
}
