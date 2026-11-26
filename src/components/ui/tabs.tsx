'use client'

import {Tabs as RadixTabs} from 'radix-ui'
import {cn} from '@/src/lib/utils'

const Tabs = RadixTabs.Root

function TabsList({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof RadixTabs.List>) {
  return (
    <RadixTabs.List
      className={cn('grid grid-flow-col auto-cols-fr gap-3', className)}
      {...props}
    />
  )
}

// Looks like the secondary Button, and like the primary one when active
function TabsTrigger({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof RadixTabs.Trigger>) {
  return (
    <RadixTabs.Trigger
      className={cn(
        'px-4 block-10 inline-flex justify-center items-center whitespace-nowrap text-base font-bold border focus-ring disabled:pointer-events-none disabled:opacity-30',
        'data-inactive:bg-surface-4 data-inactive:text-primary data-inactive:border-surface-5 data-inactive:hover:bg-surface-5 data-inactive:focus-visible:bg-surface-5',
        'data-active:bg-primary data-active:text-primary-foreground data-active:border-primary data-active:hover:bg-primary-hover data-active:hover:border-primary-hover data-active:focus-visible:bg-primary-hover data-active:focus-visible:border-primary-hover',
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof RadixTabs.Content>) {
  return (
    <RadixTabs.Content
      className={cn('focus-ring', className)}
      {...props}
    />
  )
}

export {Tabs, TabsContent, TabsList, TabsTrigger}
