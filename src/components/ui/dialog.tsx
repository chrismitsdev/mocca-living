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
import {cn} from '#/lib/utils'

const Dialog = Root
const DialogTrigger = Trigger
const DialogPortal = Portal
const DialogClose = Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof Overlay>,
  React.ComponentPropsWithoutRef<typeof Overlay>
>(({className, ...props}, ref) => (
  <Overlay
    className={cn(
      'fixed inset-0 z-[1] bg-black/75 data-open:animate-in data-open:fade-in-0 data-open:duration-750 data-open:backdrop-blur-[1px] data-closed:animate-out data-closed:fade-out-0 data-closed:duration-350 data-closed:backdrop-blur-none ease-mocca',
      className
    )}
    ref={ref}
    {...props}
  />
))

const DialogContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(
  (
    {
      className,
      children,
      'aria-describedby': ariaDescribedBy = undefined,
      ...props
    },
    ref
  ) => (
    <Content
      className={cn(
        'p-6 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] w-full max-w-xl bg-surface-2 rounded shadow-medium data-open:animate-dialog-open data-closed:animate-dialog-closed',
        className
      )}
      aria-describedby={ariaDescribedBy}
      ref={ref}
      {...props}
    >
      {children}
    </Content>
  )
)

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col space-y-1.5', className)}
    {...props}
  />
)

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof Title>,
  React.ComponentPropsWithoutRef<typeof Title>
>(({className, ...props}, ref) => (
  <Title
    className={cn('text-lg font-semibold tracking-tight', className)}
    ref={ref}
    {...props}
  />
))

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof Description>,
  React.ComponentPropsWithoutRef<typeof Description>
>(({className, ...props}, ref) => (
  <Description
    className={cn('text-sm text-muted-foreground tracking-wide', className)}
    ref={ref}
    {...props}
  />
))

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:space-x-2 sm:flex-row sm:justify-end',
      className
    )}
    {...props}
  />
)

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
