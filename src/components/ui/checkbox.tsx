'use client'

import * as React from 'react'
import {Root, Indicator} from '@radix-ui/react-checkbox'
import {CheckIcon} from 'lucide-react'
import {cn} from '@/src/lib/utils'

const Checkbox: React.FC<React.ComponentPropsWithRef<typeof Root>> = ({
  className,
  ...props
}) => {
  return (
    <Root
      className={cn(
        'relative h-[18px] w-[18px] grid place-content-center shrink-0 bg-surface-1 border border-border  rounded data-checked:bg-primary data-checked:text-primary-foreground data-checked:border-none disabled:pointer-events-none disabled:opacity-35 transition',
        className
      )}
      {...props}
    >
      <Indicator className='absolute inset-0'>
        <CheckIcon size={18} />
      </Indicator>
    </Root>
  )
}

Checkbox.displayName = 'Checkbox'

export {Checkbox}
