'use client'

import {IconX} from '@tabler/icons-react'
import {Dialog as RadixDialog} from 'radix-ui'
import {IconButton} from '@/src/components/ui/icon-button'
import {ScrollArea} from '@/src/components/ui/scrollarea'
import {cn} from '@/src/lib/utils'

const Dialog = RadixDialog.Root
const DialogTrigger = RadixDialog.Trigger
const DialogTitle = RadixDialog.Title

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
    <RadixDialog.Portal>
      <DialogOverlay />
      <RadixDialog.Content
        className={cn(
          'fixed inset-bs-1/2 inset-s-1/2 -translate-1/2 origin-center z-50 inline-[calc(100%-24px)] block-auto max-block-[calc(100%-24px)] flex flex-col bg-surface-2 shadow-sm  data-open:animate-dialog-open data-closed:animate-dialog-close sm:max-inline-2xl',
          className
        )}
        aria-describedby={ariaDescribedBy}
        {...props}
      />
    </RadixDialog.Portal>
  )
}

function DialogHeader({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={cn(
        'shrink-0 p-4 flex justify-between items-center border-b border-b-surface-4 sm:p-6',
        className
      )}
      {...props}
    >
      <DialogTitle className='text-lg font-bold'>{children}</DialogTitle>
      <DialogClose />
    </div>
  )
}

function DialogBody({className, ...props}: React.ComponentPropsWithRef<'div'>) {
  return (
    <ScrollArea className='flex-1 min-block-0 flex flex-col'>
      <div
        className={cn('p-4 sm:p-6', className)}
        {...props}
      />
    </ScrollArea>
  )
}

function DialogClose({
  'aria-label': ariaLabel = 'Close dialog',
  variant = 'ghost',
  size = 'small',
  ...props
}: Omit<React.ComponentPropsWithRef<typeof IconButton>, 'aria-label'> & {
  'aria-label'?: string
}) {
  return (
    <RadixDialog.Close asChild>
      <IconButton
        aria-label={ariaLabel}
        variant={variant}
        size={size}
        {...props}
      >
        <IconX />
      </IconButton>
    </RadixDialog.Close>
  )
}

export {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
}
