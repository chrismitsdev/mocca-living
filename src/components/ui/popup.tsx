'use client'

import {
  Anchor,
  Arrow,
  Close,
  Content,
  Portal,
  Root,
  Trigger
} from '@radix-ui/react-popover'
import {cn} from '@/src/lib/utils'

const Popup = Root
const PopupPortal = Portal
const PopupTrigger = Trigger
const PopupAnchor = Anchor
const PopupClose = Close

function PopupContent({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<typeof Content>) {
  return (
    <Content
      className={cn(
        'p-6 relative z-50 min-inline-60 max-w-lg bg-surface-2 drop-shadow-sm outline-none data-open:data-top:animate-slide-top-show data-open:data-right:animate-slide-right-show data-open:data-bottom:animate-slide-bottom-show data-open:data-left:animate-slide-left-show data-closed:data-top:animate-slide-top-hide data-closed:data-right:animate-slide-right-hide data-closed:data-bottom:animate-slide-bottom-hide data-closed:data-left:animate-slide-left-hide',
        className
      )}
      {...props}
    >
      {children}
      <PopupArrow />
    </Content>
  )
}

function PopupArrow({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Arrow>) {
  return (
    <Arrow
      className={cn('w-5 h-2.5 fill-surface-2')}
      {...props}
    />
  )
}

Popup.displayName = 'Popup'
PopupTrigger.displayName = 'PopupTrigger'
PopupAnchor.displayName = 'PopupAnchor'
PopupPortal.displayName = 'PopupPortal'
PopupContent.displayName = 'PopupContent'
PopupClose.displayName = 'PopupClose'
PopupArrow.displayName = 'PopupArrow'

export {Popup, PopupAnchor, PopupClose, PopupContent, PopupPortal, PopupTrigger}
