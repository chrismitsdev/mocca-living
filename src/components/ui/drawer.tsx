'use client'

import {IconX} from '@tabler/icons-react'
import {Dialog} from 'radix-ui'
import {IconButton} from '@/src/components/ui/icon-button'
import {cn} from '@/src/lib/utils'

const Drawer = Dialog.Root
const DrawerTrigger = Dialog.Trigger
const DrawerPortal = Dialog.Portal

function DrawerOverlay({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Dialog.Overlay>) {
  return (
    <Dialog.Overlay
      className={cn(
        'fixed inset-0 z-50 bg-black/75 backdrop-blur-[1px] data-open:animate-overlay-open data-closed:animate-overlay-close',
        className
      )}
      {...props}
    />
  )
}

function DrawerContent({
  className,
  'aria-describedby': ariaDescribedBy,
  side = 'right',
  ...props
}: React.ComponentPropsWithRef<typeof Dialog.Content> & {
  side?: 'top' | 'right' | 'bottom' | 'left'
}) {
  return (
    <Dialog.Content
      className={cn(
        'fixed z-50 bg-surface-3 shadow-sm',
        // Top
        'data-top:inset-x-0 data-top:inset-bs-0 data-top:data-open:animate-drawer-top-open data-top:data-closed:animate-drawer-top-close',
        // Right
        'data-right:inset-y-0 data-right:inset-e-0 data-right:h-full data-right:w-full data-right:sm:max-w-sm data-right:data-open:animate-drawer-right-open data-right:data-closed:animate-drawer-right-close',
        // Bottom
        'data-bottom:inset-x-0 data-bottom:inset-be-0 data-bottom:data-open:animate-drawer-bottom-open data-bottom:data-closed:animate-drawer-bottom-close',
        // Left
        'data-left:inset-y-0 data-left:inset-s-0 data-left:h-full data-left:w-full data-left:sm:max-w-sm data-left:data-open:animate-drawer-left-open data-left:data-closed:animate-drawer-left-close',
        className
      )}
      aria-describedby={ariaDescribedBy}
      data-side={side}
      {...props}
    />
  )
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Dialog.Title>) {
  return (
    <Dialog.Title
      className={cn('text-lg font-bold text-foreground', className)}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Dialog.Description>) {
  return (
    <Dialog.Description
      className={cn('text-sm', className)}
      {...props}
    />
  )
}

function DrawerClose({
  'aria-label': ariaLabel,
  ...props
}: Omit<
  React.ComponentPropsWithRef<typeof Dialog.Close>,
  'asChild' | 'children'
>) {
  return (
    <Dialog.Close
      {...props}
      asChild
    >
      <IconButton
        aria-label={ariaLabel || 'Close drawer'}
        variant='ghost'
        size='small'
      >
        <IconX />
      </IconButton>
    </Dialog.Close>
  )
}

Drawer.displayName = 'Drawer'
DrawerTrigger.displayName = 'DrawerTrigger'
DrawerPortal.displayName = 'DrawerPortal'
DrawerOverlay.displayName = 'DrawerOverlay'
DrawerContent.displayName = 'DrawerContent'
DrawerTitle.displayName = 'DrawerTitle'
DrawerDescription.displayName = 'DrawerDescription'
DrawerClose.displayName = 'DrawerClose'

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger
}
