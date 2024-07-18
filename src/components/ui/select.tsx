'use client'

import * as React from 'react'
import {
  Root, 
  Portal,
  Viewport,
  Group, 
  Value, 
  Trigger, 
  Content, 
  Label,
  Item, 
  ItemIndicator, 
  ItemText, 
  Separator,
  Icon
} from '@radix-ui/react-select'
import {CheckIcon, ChevronDownIcon} from '@radix-ui/react-icons'
import {cn} from '#/lib/utils'

const Select = Root
const SelectPortal = Portal
const SelectViewport = Viewport
const SelectGroup = Group
const SelectValue = Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof Trigger>,
  React.ComponentPropsWithoutRef<typeof Trigger>
>(({className, children, ...props}, ref) => (
  <Trigger
    className={cn(
      'px-4 py-[7px] w-full flex items-center gap-2 bg-app-background text-foreground-alt font-semibold text-sm border rounded focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:grow [&>span]:text-left [&>span]:leading-6',
      className
    )}
    ref={ref}
    {...props}
  >
    {children}
    <Icon asChild>
      <ChevronDownIcon width={16} height={16} />
    </Icon>
  </Trigger>
))

const SelectContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(({className, children, position = 'popper', sideOffset = 4, ...props}, ref) => (
  <Content
    className={cn(
      'w-[var(--radix-select-trigger-width)] max-h-[var(--radix-select-content-available-height)] overflow-hidden bg-app-background border rounded shadow-md data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-top:slide-in-from-bottom-2 data-right:slide-in-from-left-2 data-bottom:slide-in-from-top-2 data-left:slide-in-from-right-2',
      className
    )}
    sideOffset={sideOffset}
    position={position}
    ref={ref}
    {...props}
  >
    {children}
  </Content>
))

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({className, ...props}, ref) => (
  <Label
    className={cn(
      'py-1.5 pl-8 pr-2 text-sm font-semibold', 
      className
    )}
    ref={ref}
    {...props}
  />
))

const SelectItem = React.forwardRef<
  React.ElementRef<typeof Item>,
  React.ComponentPropsWithoutRef<typeof Item>
>(({className, children, ...props}, ref) => (
  <Item
    className={cn(
      'pl-8 pr-4 py-2 flex items-center text-sm cursor-pointer select-none outline-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&>span]:leading-6',
      className
    )}
    ref={ref}
    {...props}
  >
    <div className='absolute left-2'>
      <ItemIndicator asChild>
        <CheckIcon width={16} height={16} />
      </ItemIndicator>
    </div>

    <ItemText>{children}</ItemText>
  </Item>
))

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentPropsWithoutRef<typeof Separator>
>(({className, ...props}, ref) => (
  <Separator
    className={cn(
      'my-1 h-px bg-border',
      className
    )}
    ref={ref}
    {...props}
  />
))

Select.displayName = 'Select'
SelectTrigger.displayName = 'SelectTrigger'
SelectPortal.displayName = 'SelectPortal'
SelectContent.displayName = 'SelectContent'
SelectViewport.displayName = 'SelectViewport'
SelectGroup.displayName = 'SelectGroup'
SelectValue.displayName = 'SelectValue'
SelectLabel.displayName = 'SelectLabel'
SelectItem.displayName = 'SelectItem'
SelectSeparator.displayName = 'SelectSeparator'

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectPortal,
  SelectContent,
  SelectViewport,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectSeparator
}
