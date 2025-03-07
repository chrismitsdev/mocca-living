'use client'

import * as React from 'react'
import {Root, Trigger, Content} from '@radix-ui/react-collapsible'
import {cn} from '@/src/lib/utils'

const Collapsible: React.FC<React.ComponentPropsWithRef<typeof Root>> = ({
  className,
  ...props
}) => {
  return (
    <Root
      className={cn('group', className)}
      {...props}
    />
  )
}

const CollapsibleTrigger = Trigger

const CollapsibleContent: React.FC<
  React.ComponentPropsWithRef<typeof Root>
> = ({className, ...props}) => {
  return (
    <Content
      className={cn(
        'overflow-hidden data-open:animate-collapsible-open data-closed:animate-collapsible-close',
        className
      )}
      {...props}
    />
  )
}

Collapsible.displayName = 'Collapsible'
CollapsibleTrigger.displayName = 'CollapsibleTrigger'
CollapsibleContent.displayName = 'CollapsibleContent'

export {Collapsible, CollapsibleTrigger, CollapsibleContent}
