'use client'

import * as React from 'react'
import {cn} from '@/src/lib/utils'

const Checkbox: React.FC<React.ComponentPropsWithRef<'input'>> = ({
  className,
  ...props
}) => {
  return (
    <input
      className={cn(
        'appearance-none font-[inherit] text-current relative shrink-0',
        'w-6 h-6 bg-surface-1 border border-border rounded before:absolute before:inset-0.5 before:bg-primary before:rounded-xs before:scale-0 checked:before:scale-100 before:transition',
        className
      )}
      {...props}
      type='checkbox'
    />
  )
}

Checkbox.displayName = 'Checkbox'

export {Checkbox}
