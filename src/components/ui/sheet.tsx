'use client'

import * as React from 'react'
import {Slottable} from '@radix-ui/react-slot'
import {
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Title,
  Description,
  Close
} from '@radix-ui/react-dialog'
import {cva, type VariantProps} from 'class-variance-authority'
import {VisuallyHidden} from '@/components/ui/visually-hidden'
import {cn} from '#/lib/utils'

const sheetContentVariants = cva(
  [
    'p-6',
    'fixed',
    'z-50',
    'gap-4',
    'bg-surface-1',
    'shadow',
    'transition',
    'ease-in-out',
    'data-open:animate-in',
    'data-open:duration-300',
    'data-closed:animate-out',
    'data-closed:duration-150'
  ],
  {
    variants: {
      side: {
        top: [
          'inset-x-0',
          'top-0',
          'border-b',
          'data-open:slide-in-from-top',
          'data-closed:slide-out-to-top'
        ],
        bottom: [
          'inset-x-0',
          'bottom-0',
          'border-t',
          'data-open:slide-in-from-bottom',
          'data-closed:slide-out-to-bottom'
        ],
        left: [
          'inset-y-0',
          'left-0',
          'h-full',
          'w-4/5',
          'border-r',
          'data-open:slide-in-from-left',
          'data-closed:slide-out-to-left',
          'sm:max-w-sm'
        ],
        right: [
          'inset-y-0',
          'right-0',
          'h-full',
          'w-4/5',
          'border-l',
          'data-open:slide-in-from-right',
          'data-closed:slide-out-to-right',
          'sm:max-w-sm'
        ]
      }
    },
    defaultVariants: {
      side: 'right'
    }
  }
)

const Sheet = Root
const SheetTrigger = Trigger
const SheetPortal = Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof Overlay>,
  React.ComponentPropsWithoutRef<typeof Overlay>
>(({className, ...props}, ref) => (
  <Overlay
    className={cn(
      'fixed inset-0 z-50 bg-black/75 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 data-open:backdrop-blur-[1px] data-closed:backdrop-blur-none',
      className
    )}
    ref={ref}
    {...props}
  />
))

const SheetContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content> & VariantProps<typeof sheetContentVariants>
>(({side = 'right', className, 'aria-describedby': ariaDescribedBy = undefined, ...props}, ref) => (
  <Content
    className={cn(sheetContentVariants({side}), className)}
    aria-describedby={ariaDescribedBy}
    ref={ref}
    {...props}
  />
))

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof Title>,
  React.ComponentPropsWithoutRef<typeof Title>
>(({className, ...props}, ref) => (
  <Title
    className={cn('text-lg font-semibold text-foreground', className)}
    ref={ref}
    {...props}
  />
))

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof Description>,
  React.ComponentPropsWithoutRef<typeof Description>
>(({className, ...props}, ref) => (
  <Description
    className={cn('text-sm text-muted-foreground', className)}
    ref={ref}
    {...props}
  />
))

const SheetClose = React.forwardRef<
  React.ElementRef<typeof Close>,
  React.ComponentPropsWithoutRef<typeof Close>
>(({children, ...props}, ref) => (
  <Close
    ref={ref}
    {...props}
  >
    <Slottable>{children}</Slottable>
    <VisuallyHidden>{'Close dialog'}</VisuallyHidden>
  </Close>
))

// const SheetHeader = ({className, ...props}: React.HTMLAttributes<HTMLDivElement>) => (
//   <div
//     className={cn('flex flex-col space-y-2 text-center sm:text-left', className)}
//     {...props}
//   />
// )

// const SheetFooter = ({className, ...props}: React.HTMLAttributes<HTMLDivElement>) => (
//   <div
//     className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
//     {...props}
//   />
// )

Sheet.displayName = 'Sheet'
SheetTrigger.displayName = 'SheetTrigger'
SheetPortal.displayName = 'SheetPortal'
SheetOverlay.displayName = 'SheetOverlay'
SheetContent.displayName = 'SheetContent'
SheetTitle.displayName = 'SheetTitle'
SheetDescription.displayName = 'SheetDescription'
SheetClose.displayName = 'SheetClose'

export {
  Sheet,
  SheetTrigger,
  SheetPortal,
  SheetOverlay,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetClose
}
