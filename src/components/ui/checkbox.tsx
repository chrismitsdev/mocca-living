'use client'
import {cn} from '@/src/lib/utils'

interface CheckboxProps
  extends Omit<React.ComponentPropsWithRef<'input'>, 'type'> {
  error?: boolean
}

function Checkbox({className, error, ...props}: CheckboxProps) {
  return (
    <input
      className={cn(
        'appearance-none font-[inherit] text-current relative shrink-0',
        'size-6 bg-surface-1 border border-border before:absolute before:inset-0.5 before:bg-primary before:scale-0 checked:before:scale-100 before:transition disabled:pointer-events-none disabled:opacity-35',
        error && 'border-error',
        className
      )}
      {...props}
      type='checkbox'
    />
  )
}

Checkbox.displayName = 'Checkbox'

export {Checkbox}
