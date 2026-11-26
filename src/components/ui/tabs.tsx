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

// Looks like the secondary Button, and like the primary one when active.
// Radix focuses a trigger on mousedown so the arrow keys work after a click;
// Safari counts that scripted focus as :focus-visible and shows the ring on
// every tap. data-pointer-focus marks a pointer-focused trigger, so its focus
// styles stay off until it loses focus; arrow keys move to an unmarked one
function TabsTrigger({
  className,
  onPointerDown,
  onPointerCancel,
  onBlur,
  ...props
}: React.ComponentPropsWithRef<typeof RadixTabs.Trigger>) {
  return (
    <RadixTabs.Trigger
      className={cn(
        'px-4 block-10 inline-flex justify-center items-center whitespace-nowrap text-base font-bold border not-data-pointer-focus:focus-ring data-pointer-focus:outline-none disabled:pointer-events-none disabled:opacity-30',
        'data-inactive:bg-surface-4 data-inactive:text-primary data-inactive:border-surface-5 data-inactive:hover:bg-surface-5 data-inactive:not-data-pointer-focus:focus-visible:bg-surface-5',
        'data-active:bg-primary data-active:text-primary-foreground data-active:border-primary data-active:hover:bg-primary-hover data-active:hover:border-primary-hover data-active:not-data-pointer-focus:focus-visible:bg-primary-hover data-active:not-data-pointer-focus:focus-visible:border-primary-hover',
        className
      )}
      onPointerDown={(event) => {
        event.currentTarget.dataset.pointerFocus = ''
        onPointerDown?.(event)
      }}
      // A touch that turns into a scroll never focuses the trigger
      onPointerCancel={(event) => {
        if (document.activeElement !== event.currentTarget) {
          delete event.currentTarget.dataset.pointerFocus
        }
        onPointerCancel?.(event)
      }}
      onBlur={(event) => {
        delete event.currentTarget.dataset.pointerFocus
        onBlur?.(event)
      }}
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
