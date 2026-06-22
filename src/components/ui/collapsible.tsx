'use client'

import {Collapsible as RadixCollapsible} from 'radix-ui'
import {cn} from '@/src/lib/utils'

const CollapsibleTrigger = RadixCollapsible.Trigger

function Collapsible({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof RadixCollapsible.Root>) {
  return (
    <RadixCollapsible.Root
      className={cn('group', className)}
      {...props}
    />
  )
}

function CollapsibleContent({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof RadixCollapsible.Content>) {
  return (
    <RadixCollapsible.Content
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

export {Collapsible, CollapsibleContent, CollapsibleTrigger}
