'use client'

import {IconSelector} from '@tabler/icons-react'
import {Select as RadixSelect} from 'radix-ui'
import {cn} from '@/src/lib/utils'

const Select = RadixSelect.Root
const SelectPortal = RadixSelect.Portal
const SelectViewport = RadixSelect.Viewport
const SelectGroup = RadixSelect.Group
const SelectValue = RadixSelect.Value
const SelectItemText = RadixSelect.ItemText

function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<typeof RadixSelect.Trigger>) {
  return (
    <RadixSelect.Trigger
      className={cn(
        'px-3 py-1.75 flex items-center gap-1.5 bg-surface-1 border border-border font-bold transition hover:border-border-hover focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-2  disabled:border-border disabled:pointer-events-none disabled:opacity-35 data-open:border-border-hover data-placeholder:[&>div>span]:text-sm data-placeholder:[&>div>span]:font-normal data-open:shadow-sm [&>div]:grow [&>div]:text-left group',
        className
      )}
      {...props}
    >
      {children}
      <RadixSelect.Icon
        className='shrink-0 transition'
        asChild
      >
        <IconSelector className='size-5' />
      </RadixSelect.Icon>
    </RadixSelect.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = 'popper',
  sideOffset = 8,
  ...props
}: React.ComponentPropsWithRef<typeof RadixSelect.Content>) {
  return (
    <RadixSelect.Content
      className={cn(
        'inline-(--radix-select-trigger-width) max-block-(--radix-select-content-available-height) z-50 overflow-hidden bg-surface-1 border border-border-hover shadow-sm',
        [
          'data-top:data-open:animate-slide-top-show',
          'data-top:data-closed:animate-slide-top-hide'
        ],
        [
          'data-right:data-open:animate-slide-right-show',
          'data-right:data-closed:animate-slide-right-hide'
        ],
        [
          'data-bottom:data-open:animate-slide-bottom-show',
          'data-bottom:data-closed:animate-slide-bottom-hide'
        ],
        [
          'data-left:data-open:animate-slide-left-show',
          'data-left:data-closed:animate-slide-left-hide'
        ],
        className
      )}
      position={position}
      sideOffset={sideOffset}
      {...props}
    >
      {children}
    </RadixSelect.Content>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof RadixSelect.Label>) {
  return (
    <RadixSelect.Label
      className={cn('py-1.5 pl-8 pr-2 text-sm font-bold', className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<typeof RadixSelect.Item>) {
  return (
    <RadixSelect.Item
      className={cn(
        'px-3 py-2 flex items-center gap-1.5 cursor-pointer select-none outline-none data-highlighted:bg-surface-2 data-disabled:pointer-events-none data-disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </RadixSelect.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof RadixSelect.Separator>) {
  return (
    <RadixSelect.Separator
      className={cn('my-1 h-px bg-border', className)}
      {...props}
    />
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemText,
  SelectLabel,
  SelectPortal,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectViewport
}
