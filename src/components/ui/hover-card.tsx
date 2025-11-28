'use client'

import {Arrow, Content, Portal, Root, Trigger} from '@radix-ui/react-hover-card'
import type * as React from 'react'
import {cn} from '@/src/lib/utils'

const HoverCard = Root
const HoverCardPortal = Portal
const HoverCardTrigger = Trigger

const HoverCardContent: React.FC<
  React.ComponentPropsWithRef<typeof Content>
> = ({
  className,
  align = 'center',
  sideOffset = 8,
  side = 'bottom',
  ...props
}) => {
  return (
    <Content
      className={cn(
        // We cant apply exit animations on this component.
        // Content re-appears if mouse moves to the content area and content has not unmounted yet.
        'p-6 max-w-lg z-50 bg-surface-2 rounded drop-shadow-medium outline-none data-open:data-top:animate-slide-top-show data-open:data-right:animate-slide-right-show data-open:data-bottom:animate-slide-bottom-show data-open:data-left:animate-slide-left-show',
        className
      )}
      side={side}
      align={align}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

const HoverCardArrow: React.FC<React.ComponentPropsWithRef<typeof Arrow>> = ({
  className,
  ...props
}) => {
  return (
    <Arrow
      className={cn('fill-surface-2 w-4 h-2', className)}
      {...props}
    />
  )
}

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
