'use client'

import * as React from 'react'
import {Root, Trigger, Content} from '@radix-ui/react-collapsible'
import {cn} from '#/lib/utils'

const Collapsible = React.forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root>
>(({className, ...props}, ref) => (
  <Root
    className={cn('group', className)}
    ref={ref}
    {...props}
  />
))

const CollapsibleTrigger = Trigger

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(({className, ...props}, ref) => (
  <Content
    className={cn(
      'overflow-hidden data-open:animate-collapsible-open data-closed:animate-collapsible-close',
      className
    )}
    ref={ref}
    {...props}
  />
))

Collapsible.displayName = 'Collapsible'
CollapsibleTrigger.displayName = 'CollapsibleTrigger'
CollapsibleContent.displayName = 'CollapsibleContent'

export {Collapsible, CollapsibleTrigger, CollapsibleContent}
