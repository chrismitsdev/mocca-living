'use client'

import {IconX} from '@tabler/icons-react'
import {Dialog as RadixDialog} from 'radix-ui'
import {IconButton} from '@/src/components/ui/icon-button'
import {cn} from '@/src/lib/utils'

const Dialog = RadixDialog.Root
const DialogTrigger = RadixDialog.Trigger
const DialogPortal = RadixDialog.Portal

function DialogOverlay({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof RadixDialog.Overlay>) {
  return (
    <RadixDialog.Overlay
      className={cn(
        'fixed inset-0 z-50 bg-black/75 backdrop-blur-[1px] data-open:animate-overlay-open data-closed:animate-overlay-close',
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  'aria-describedby': ariaDescribedBy,
  ...props
}: React.ComponentPropsWithRef<typeof RadixDialog.Content>) {
  return (
    <RadixDialog.Content
      className={cn(
        'fixed inset-bs-1/2 inset-s-1/2 -translate-1/2 origin-center z-50 inline-full block-full max-inline-[calc(100%-24px)] max-block-[calc(100%-24px)] bg-surface-2 shadow-sm data-open:animate-dialog-open data-closed:animate-dialog-close sm:block-auto sm:max-inline-378',
        className
      )}
      aria-describedby={ariaDescribedBy}
      {...props}
    />
  )
}

function DialogHeader({
  className,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={cn('px-6 pt-6 space-y-2', className)}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof RadixDialog.Title>) {
  return (
    <RadixDialog.Title
      className={cn('text-lg font-bold', className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadixDialog.Description>) {
  return (
    <RadixDialog.Description
      className={cn('text-sm', className)}
      {...props}
    />
  )
}

function DialogBody({className, ...props}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={cn('p-6', className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={cn('px-6 pb-6', className)}
      {...props}
    />
  )
}

function DialogClose({
  'aria-label': ariaLabel,
  className,
  variant = 'ghost',
  ...props
}: Omit<
  React.ComponentPropsWithRef<typeof RadixDialog.Close>,
  'asChild' | 'children'
> & {
  variant?: React.ComponentPropsWithRef<typeof IconButton>['variant']
}) {
  return (
    <RadixDialog.Close
      className={cn('absolute inset-bs-5 inset-e-4 z-50', className)}
      {...props}
      asChild
    >
      <IconButton
        aria-label={ariaLabel || 'Close dialog'}
        variant={variant}
        size='small'
      >
        <IconX />
      </IconButton>
    </RadixDialog.Close>
  )
}

Dialog.displayName = 'Dialog'
DialogTrigger.displayName = 'DialogTrigger'
DialogPortal.displayName = 'DialogPortal'
DialogOverlay.displayName = 'DialogOverlay'
DialogContent.displayName = 'DialogContent'
DialogHeader.displayName = 'DialogHeader'
DialogTitle.displayName = 'DialogTitle'
DialogDescription.displayName = 'DialogDescription'
DialogBody.displayName = 'DialogBody'
DialogFooter.displayName = 'DialogFooter'
DialogClose.displayName = 'DialogClose'

export {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger
}
