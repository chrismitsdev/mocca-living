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
import {cn} from '@/src/lib/utils'
import {VisuallyHidden} from '@/src/components/ui/visually-hidden'

const drawerContentVariants = cva(
  ['fixed', 'z-[1]', 'bg-surface-2', 'shadow'],
  {
    variants: {
      side: {
        top: [
          'inset-x-0',
          'top-0',
          'data-open:animate-drawer-top-open',
          'data-closed:animate-drawer-top-close'
        ],
        right: [
          'inset-y-0',
          'right-0',
          'h-full',
          'w-4/5',
          'data-open:animate-drawer-right-open',
          'data-closed:animate-drawer-right-close',
          'sm:max-w-sm'
        ],
        bottom: [
          'inset-x-0',
          'bottom-0',
          'data-open:animate-drawer-bottom-open',
          'data-closed:animate-drawer-bottom-close'
        ],
        left: [
          'inset-y-0',
          'left-0',
          'h-full',
          'w-4/5',
          'data-open:animate-drawer-left-open',
          'data-closed:animate-drawer-left-close',
          'sm:max-w-sm'
        ]
      }
    },
    defaultVariants: {
      side: 'right'
    }
  }
)

const Drawer = Root
const DrawerTrigger = Trigger
const DrawerPortal = Portal

const DrawerOverlay: React.FC<React.ComponentPropsWithRef<typeof Overlay>> = ({
  className,
  ...props
}) => {
  return (
    <Overlay
      className={cn(
        'fixed inset-0 z-[1] bg-black/75 backdrop-blur-[1px] data-open:animate-overlay-open data-closed:animate-overlay-close',
        className
      )}
      {...props}
    />
  )
}

const DrawerContent: React.FC<
  React.ComponentPropsWithRef<typeof Content> &
    VariantProps<typeof drawerContentVariants>
> = ({
  side = 'right',
  className,
  'aria-describedby': ariaDescribedBy = undefined,
  ...props
}) => {
  return (
    <Content
      className={cn(drawerContentVariants({side}), className)}
      aria-describedby={ariaDescribedBy}
      {...props}
    />
  )
}

const DrawerTitle: React.FC<React.ComponentPropsWithRef<typeof Title>> = ({
  className,
  ...props
}) => {
  return (
    <Title
      className={cn('text-lg font-semibold text-foreground', className)}
      {...props}
    />
  )
}

const DrawerDescription: React.FC<
  React.ComponentPropsWithRef<typeof Description>
> = ({className, ...props}) => {
  return (
    <Description
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

const DrawerClose: React.FC<React.ComponentPropsWithRef<typeof Close>> = ({
  children,
  ...props
}) => {
  return (
    <Close {...props}>
      <Slottable>{children}</Slottable>
      <VisuallyHidden>{'Close dialog'}</VisuallyHidden>
    </Close>
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
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerClose
}
