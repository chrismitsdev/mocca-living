'use client'

import {Root} from '@radix-ui/react-separator'
import {cn} from '@/src/lib/utils'

function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: React.ComponentPropsWithRef<typeof Root>) {
  return (
    <Root
      className={cn(
        'shrink-0 bg-surface-4',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className
      )}
      decorative={decorative}
      orientation={orientation}
      {...props}
    />
  )
}

Separator.displayName = 'Separator'

export {Separator}
