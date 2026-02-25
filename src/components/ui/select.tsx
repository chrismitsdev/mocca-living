'use client'

import {
  Content,
  Group,
  Icon,
  Item,
  ItemText,
  Label,
  Portal,
  Root,
  Separator,
  Trigger,
  Value,
  Viewport
} from '@radix-ui/react-select'
import {ChevronsUpDownIcon} from 'lucide-react'
import {cn} from '@/src/lib/utils'

const Select = Root
const SelectPortal = Portal
const SelectViewport = Viewport
const SelectGroup = Group
const SelectValue = Value
const SelectItemText = ItemText

const SelectTrigger: React.FC<React.ComponentPropsWithRef<typeof Trigger>> = ({
  className,
  children,
  ...props
}) => (
  <Trigger
    className={cn(
      'px-3 py-1.75 flex items-center gap-2 bg-surface-1 border border-border rounded font-semibold transition hover:border-border-hover focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:border-border disabled:pointer-events-none disabled:opacity-35 data-open:border-border-hover data-placeholder:[&>div>span]:text-sm data-placeholder:[&>div>span]:font-normal data-placeholder:[&>div>span]:text-foreground-muted data-open:shadow [&>div]:grow [&>div]:text-left group',
      className
    )}
    {...props}
  >
    {children}
    <Icon
      asChild
      className='shrink-0 transition'
    >
      <ChevronsUpDownIcon size={16} />
    </Icon>
  </Trigger>
)

const SelectContent: React.FC<React.ComponentPropsWithRef<typeof Content>> = ({
  className,
  children,
  position = 'popper',
  sideOffset = 6,
  ...props
}) => {
  return (
    <Content
      className={cn(
        'w-(--radix-select-trigger-width) max-h-(--radix-select-content-available-height) z-1 overflow-hidden bg-surface-1 border border-border-hover rounded shadow data-open:data-top:animate-slide-top-show data-open:data-right:animate-slide-right-show data-open:data-bottom:animate-slide-bottom-show data-open:data-left:animate-slide-left-show data-closed:data-top:animate-slide-top-hide data-closed:data-right:animate-slide-right-hide data-closed:data-bottom:animate-slide-bottom-hide data-closed:data-left:animate-slide-left-hide',
        className
      )}
      sideOffset={sideOffset}
      position={position}
      {...props}
    >
      {children}
    </Content>
  )
}

const SelectLabel: React.FC<React.ComponentPropsWithRef<typeof Label>> = ({
  className,
  ...props
}) => {
  return (
    <Label
      className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
      {...props}
    />
  )
}

const SelectItem: React.FC<React.ComponentPropsWithRef<typeof Item>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <Item
      className={cn(
        'px-3 py-2 flex items-center gap-1.5 cursor-pointer select-none outline-none data-disabled:pointer-events-none data-disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </Item>
  )
}

const SelectSeparator: React.FC<
  React.ComponentPropsWithRef<typeof Separator>
> = ({className, ...props}) => {
  return (
    <Separator
      className={cn('my-1 h-px bg-border', className)}
      {...props}
    />
  )
}

Select.displayName = 'Select'
SelectTrigger.displayName = 'SelectTrigger'
SelectPortal.displayName = 'SelectPortal'
SelectContent.displayName = 'SelectContent'
SelectViewport.displayName = 'SelectViewport'
SelectGroup.displayName = 'SelectGroup'
SelectValue.displayName = 'SelectValue'
SelectLabel.displayName = 'SelectLabel'
SelectItem.displayName = 'SelectItem'
SelectItemText.displayName = 'SelectItemText'
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
  SelectItemText,
  SelectSeparator
}
