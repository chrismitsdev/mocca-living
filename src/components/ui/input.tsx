import * as React from 'react'
import {type LucideProps} from 'lucide-react'
import {cn} from '@/src/lib/utils'

interface InputProps extends React.ComponentPropsWithRef<'input'> {
  wrapperProps?: React.ComponentPropsWithRef<'div'>
  icon?: React.ComponentType<LucideProps>
}

const Input: React.FC<InputProps> = ({
  className,
  wrapperProps = {},
  icon,
  ...props
}) => {
  const {className: wrapperClassName, ...restWrapperProps} = wrapperProps

  return (
    <div
      className={cn('relative', wrapperClassName)}
      {...restWrapperProps}
    >
      <input
        className={cn(
          'py-[7px] w-full bg-surface-1 border border-border rounded font-semibold outline-0 transition placeholder:text-sm placeholder:font-normal placeholder:text-foreground-muted placeholder:opacity-100 focus-within:border-border-hover focus-within:shadow disabled:pointer-events-none disabled:opacity-35 autofill:bg-surface-1',
          icon ? 'pl-9 pr-3' : 'px-3',
          className
        )}
        {...props}
      />
      {icon && (
        <span
          className={cn(
            'absolute left-3 top-1/2 -translate-y-1/2',
            props.disabled && 'opacity-35'
          )}
        >
          {React.createElement(icon, {width: 16, height: 16})}
        </span>
      )}
    </div>
  )
}

Input.displayName = 'Input'

export {Input}
