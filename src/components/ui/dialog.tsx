'use client'

import * as React from 'react'
import {
  Root,
  Trigger,
  Overlay,
  Portal,
  Content,
  Title,
  Description,
  Close
} from '@radix-ui/react-dialog'
import {cn} from '@/src/lib/utils'

const Dialog = Root
const DialogTrigger = Trigger
const DialogPortal = Portal
const DialogClose = Close

const DialogOverlay: React.FC<React.ComponentPropsWithRef<typeof Overlay>> = ({
  className,
  ...props
}) => {
  return (
    <Overlay
      className={cn(
        'fixed inset-0 z-1 bg-black/75 backdrop-blur-[1px] data-open:animate-overlay-open data-closed:animate-overlay-close',
        className
      )}
      {...props}
    />
  )
}

const DialogContent: React.FC<React.ComponentPropsWithRef<typeof Content>> = ({
  className,
  children,
  'aria-describedby': ariaDescribedBy = undefined,
  ...props
}) => (
  <Content
    className={cn(
      'p-6 fixed left-1/2 top-1/2 -translate-1/2 origin-center z-1 w-full max-w-xl bg-surface-2 rounded shadow-small data-open:animate-dialog-open data-closed:animate-dialog-close',
      className
    )}
    aria-describedby={ariaDescribedBy}
    {...props}
  >
    {children}
  </Content>
)

const DialogHeader: React.FC<React.ComponentPropsWithRef<'div'>> = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn('flex flex-col space-y-1.5', className)}
      {...props}
    />
  )
}

const DialogTitle: React.FC<React.ComponentPropsWithRef<typeof Title>> = ({
  className,
  ...props
}) => {
  return (
    <Title
      className={cn('text-lg font-semibold tracking-tight', className)}
      {...props}
    />
  )
}

const DialogDescription: React.FC<
  React.ComponentPropsWithoutRef<typeof Description>
> = ({className, ...props}) => {
  return (
    <Description
      className={cn('text-sm text-muted-foreground tracking-wide', className)}
      {...props}
    />
  )
}

const DialogFooter: React.FC<React.ComponentPropsWithRef<'div'>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex flex-col-reverse sm:space-x-2 sm:flex-row sm:justify-end',
        className
      )}
      {...props}
    />
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
DialogFooter.displayName = 'DialogFooter'
DialogClose.displayName = 'DialogClose'

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
}
