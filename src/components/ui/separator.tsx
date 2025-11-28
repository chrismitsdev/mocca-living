'use client'

import {Root} from '@radix-ui/react-separator'
import type * as React from 'react'
import {cn} from '@/src/lib/utils'

const Separator: React.FC<React.ComponentPropsWithRef<typeof Root>> = ({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}) => {
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
