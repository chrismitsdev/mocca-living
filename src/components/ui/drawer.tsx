'use client'

import {IconX} from '@tabler/icons-react'
import {Dialog} from 'radix-ui'
import {IconButton} from '@/src/components/ui/icon-button'
import {cn} from '@/src/lib/utils'

const Drawer = Dialog.Root
const DrawerTrigger = Dialog.Trigger

function DrawerOverlay({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Dialog.Overlay>) {
  return (
    <Dialog.Overlay
      className={cn(
        'fixed z-50 inset-0 bg-black/75 backdrop-blur-[1px] data-open:animate-overlay-open data-closed:animate-overlay-close',
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
    <Dialog.DialogPortal>
      <DrawerOverlay />
      <Dialog.Content
        className={cn(
          'fixed z-50 bg-surface-3 shadow-sm',
          side === 'top' && [
            'inset-x-0',
            'inset-bs-0',
            'data-open:animate-drawer-top-open',
            'data-closed:animate-drawer-top-close'
          ],
          side === 'right' && [
            'inset-y-0',
            'inset-e-0',
            'w-full',
            'sm:max-w-sm',
            'data-open:animate-drawer-right-open',
            'data-closed:animate-drawer-right-close'
          ],
          side === 'bottom' && [
            'inset-x-0',
            'inset-be-0',
            'data-open:animate-drawer-bottom-open',
            'data-closed:animate-drawer-bottom-close'
          ],
          side === 'left' && [
            'inset-y-0',
            'inset-s-0',
            'w-full',
            'sm:max-w-sm',
            'data-open:animate-drawer-left-open',
            'data-closed:animate-drawer-left-close'
          ],
          className
        )}
        aria-describedby={ariaDescribedBy}
        {...props}
      />
    </Dialog.DialogPortal>
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

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger
}
