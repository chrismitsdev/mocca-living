'use client'

import {Collapsible as RadixCollapsible} from 'radix-ui'
import {cn} from '@/src/lib/utils'

const Collapsible = RadixCollapsible.Root

function CollapsibleTrigger({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof RadixCollapsible.Trigger>) {
  return (
    <RadixCollapsible.Trigger
      className={cn('cursor-pointer focus-ring', className)}
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

export {Collapsible, CollapsibleContent, CollapsibleTrigger}
