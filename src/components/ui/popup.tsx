'use client'

import {Popover} from 'radix-ui'
import {cn} from '@/src/lib/utils'

const Popup = Popover.Root
const PopupPortal = Popover.Portal
const PopupTrigger = Popover.Trigger
const PopupAnchor = Popover.Anchor
const PopupClose = Popover.Close

function PopupContent({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<typeof Popover.Content>) {
  return (
    <Popover.Content
      className={cn(
        'p-6 relative z-50 min-inline-60 max-inline-3xl bg-surface-2 drop-shadow-sm outline-none data-open:data-top:animate-slide-top-show data-open:data-right:animate-slide-right-show data-open:data-bottom:animate-slide-bottom-show data-open:data-left:animate-slide-left-show data-closed:data-top:animate-slide-top-hide data-closed:data-right:animate-slide-right-hide data-closed:data-bottom:animate-slide-bottom-hide data-closed:data-left:animate-slide-left-hide',
        className
      )}
      {...props}
    >
      {children}
      <Popover.Arrow className={cn('w-5 h-2.5 fill-surface-2')} />
    </Popover.Content>
  )
}

Popup.displayName = 'Popup'
PopupTrigger.displayName = 'PopupTrigger'
PopupAnchor.displayName = 'PopupAnchor'
PopupPortal.displayName = 'PopupPortal'
PopupContent.displayName = 'PopupContent'
PopupClose.displayName = 'PopupClose'

export {Popup, PopupAnchor, PopupClose, PopupContent, PopupPortal, PopupTrigger}
