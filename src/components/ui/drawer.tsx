'use client'

import {IconX} from '@tabler/icons-react'
import {Dialog as RadixDrawer} from 'radix-ui'
import {IconButton} from '@/src/components/ui/icon-button'
import {cn} from '@/src/lib/utils'
import {ScrollArea} from './scrollarea'

const Drawer = RadixDrawer.Root
const DrawerTrigger = RadixDrawer.Trigger

function DrawerOverlay({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof RadixDrawer.Overlay>) {
  return (
    <RadixDrawer.Overlay
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
}: React.ComponentPropsWithRef<typeof RadixDrawer.Content> & {
  side?: 'top' | 'right' | 'bottom' | 'left'
}) {
  return (
    <RadixDrawer.Portal>
      <DrawerOverlay />
      <RadixDrawer.Content
        className={cn(
          'fixed z-50 flex flex-col bg-surface-2 shadow-sm',
          side === 'top' && [
            'inset-x-0',
            'inset-bs-0',
            'data-open:animate-drawer-top-open',
            'data-closed:animate-drawer-top-close'
          ],
          side === 'right' && [
            'inset-y-0',
            'inset-e-0',
            'inline-full',
            'sm:max-inline-sm',
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
            'inline-full',
            'sm:max-inline-sm',
            'data-open:animate-drawer-left-open',
            'data-closed:animate-drawer-left-close'
          ],
          className
        )}
        aria-describedby={ariaDescribedBy}
        {...props}
      />
    </RadixDrawer.Portal>
  )
}

function DrawerHeader({
  className,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={cn(
        'shrink-0 p-4 flex flex-wrap justify-between items-center gap-2 bg-surface-3 sm:p-6',
        className
      )}
      {...props}
    />
  )
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof RadixDrawer.Title>) {
  return (
    <RadixDrawer.Title
      className={cn('grow text-lg font-bold', className)}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof RadixDrawer.Description>) {
  return (
    <RadixDrawer.Description
      className={cn('grow text-sm', className)}
      {...props}
    />
  )
}

function DrawerBody({className, ...props}: React.ComponentPropsWithRef<'div'>) {
  return (
    <ScrollArea className='flex-1 min-block-0 flex flex-col'>
      <div
        className={cn('p-4 sm:p-6', className)}
        {...props}
      />
    </ScrollArea>
  )
}

function DrawerFooter({
  className,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={cn('shrink-0 bg-surface-3 p-4 sm:p-6', className)}
      {...props}
    />
  )
}

function DrawerClose({
  'aria-label': ariaLabel,
  ...props
}: Omit<
  React.ComponentPropsWithRef<typeof RadixDrawer.Close>,
  'asChild' | 'children'
>) {
  return (
    <RadixDrawer.Close
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
    </RadixDrawer.Close>
  )
}

export {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
}
