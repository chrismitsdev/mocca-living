'use client'

import * as React from 'react'
import {Drawer as Vaul} from 'vaul'
import {cn} from '#/lib/utils'
import {Cross2Icon} from '@radix-ui/react-icons'

const Drawer = Vaul.Root
const DrawerPortal = Vaul.Portal

const DrawerTrigger = React.forwardRef<
  React.ElementRef<typeof Vaul.Trigger>,
  React.ComponentPropsWithoutRef<typeof Vaul.Trigger>
>(({...props}, ref) => {
  return (
    <Vaul.Trigger
      ref={ref}
      {...props}
    />
  )
})

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof Vaul.Overlay>,
  React.ComponentPropsWithoutRef<typeof Vaul.Overlay>
>(({className, ...props}, ref) => (
  <Vaul.Overlay
    className={cn('fixed inset-0 bg-black/50', className)}
    ref={ref}
    {...props}
  />
))

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof Vaul.Content>,
  React.ComponentPropsWithoutRef<typeof Vaul.Content>
>(({className, 'aria-describedby': ariaDescribedBy = undefined, ...props}, ref) => {
  return (
    <Vaul.Content
      className={cn('w-[300px] bg-surface-1', className)}
      aria-describedby={ariaDescribedBy}
      ref={ref}
      {...props}
    />
  )
})

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof Vaul.Title>,
  React.ComponentPropsWithoutRef<typeof Vaul.Title>
>(({className, ...props}, ref) => (
  <Vaul.Title
    className={cn('', className)}
    ref={ref}
    {...props}
  />
))

const DrawerHandle = React.forwardRef<
  React.ElementRef<typeof Vaul.Handle>,
  React.ComponentPropsWithoutRef<typeof Vaul.Handle>
>(({className, ...props}, ref) => {
  return (
    <Vaul.Handle
      className={cn(className)}
      ref={ref}
      {...props}
    />
  )
})

const DrawerClose = React.forwardRef<
  React.ElementRef<typeof Vaul.Close>,
  React.ComponentPropsWithoutRef<typeof Vaul.Close>
>(({...props}, ref) => (
  <Vaul.Close
    ref={ref}
    {...props}
  />
))

DrawerTrigger.displayName = 'DrawerTrigger'
DrawerPortal.displayName = 'DrawerPortal'
DrawerOverlay.displayName = 'DrawerOverlay'
DrawerContent.displayName = 'DrawerContent'
DrawerTitle.displayName = 'DrawerTitle'
DrawerHandle.displayName = 'DrawerHandle'
DrawerClose.displayName = 'DrawerClose'

export {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerTitle,
  DrawerHandle,
  DrawerClose
}
