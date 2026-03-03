'use client'

import {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger
} from '@radix-ui/react-dialog'
import {cva, type VariantProps} from 'class-variance-authority'
import {cn} from '@/src/lib/utils'

const Drawer = Root
const DrawerTrigger = Trigger
const DrawerPortal = Portal

function DrawerOverlay({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Overlay>) {
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

const drawerContentVariants = cva(
  ['fixed', 'z-1', 'bg-surface-2', 'shadow-small'],
  {
    variants: {
      side: {
        top: [
          'inset-x-0',
          'inset-bs-0',
          'data-open:animate-drawer-top-open',
          'data-closed:animate-drawer-top-close'
        ],
        right: [
          'inset-y-0',
          'inset-e-0',
          'h-full',
          'w-full',
          'data-open:animate-drawer-right-open',
          'data-closed:animate-drawer-right-close',
          'sm:max-w-sm'
        ],
        bottom: [
          'inset-x-0',
          'inset-be-0',
          'data-open:animate-drawer-bottom-open',
          'data-closed:animate-drawer-bottom-close'
        ],
        left: [
          'inset-y-0',
          'inset-s-0',
          'h-full',
          'w-full',
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

function DrawerContent({
  side = 'right',
  className,
  'aria-describedby': ariaDescribedBy = undefined,
  ...props
}: React.ComponentPropsWithRef<typeof Content> &
  VariantProps<typeof drawerContentVariants>) {
  return (
    <Content
      className={cn(drawerContentVariants({side}), className)}
      aria-describedby={ariaDescribedBy}
      {...props}
    />
  )
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Title>) {
  return (
    <Title
      className={cn('text-lg font-semibold text-foreground', className)}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Description>) {
  return (
    <Description
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

function DrawerClose({
  'aria-label': ariaLabel = 'Close drawer',
  ...props
}: React.ComponentPropsWithRef<typeof Close>) {
  return (
    <Close
      aria-label={ariaLabel}
      {...props}
    />
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
