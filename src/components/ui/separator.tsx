'use client'

import {Separator as RadixSeparator} from 'radix-ui'
import {cn} from '@/src/lib/utils'

function Separator({
  className,
  decorative = true,
  ...props
}: React.ComponentPropsWithRef<typeof RadixSeparator.Root>) {
  return (
    <RadixSeparator.Root
      className={cn(
        'shrink-0 bg-surface-4 data-horizontal:h-px data-horizontal:w-full data-vertical:h-auto data-vertical:w-px',
        className
      )}
      decorative={decorative}
      {...props}
    />
  )
}

Separator.displayName = 'Separator'

export {Separator}
