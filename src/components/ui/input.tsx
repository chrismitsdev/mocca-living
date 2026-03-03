import type {LucideProps} from 'lucide-react'
import {cn} from '@/src/lib/utils'

interface InputProps extends React.ComponentPropsWithRef<'input'> {
  wrapperProps?: React.ComponentPropsWithRef<'div'>
  icon?: React.ComponentType<LucideProps>
  error?: boolean
}

function Input({
  className,
  wrapperProps = {},
  error,
  icon: Icon,
  ...props
}: InputProps) {
  const {className: wrapperClassName, ...restWrapperProps} = wrapperProps

  return (
    <div
      className={cn('relative', wrapperClassName)}
      {...restWrapperProps}
    >
      <input
        className={cn(
          'py-1.75 w-full bg-surface-1 border border-border rounded font-semibold outline-0 transition placeholder:text-sm placeholder:font-normal placeholder:text-foreground-muted placeholder:opacity-100 focus-within:border-border-hover focus-within:shadow disabled:pointer-events-none disabled:opacity-35 autofill:bg-surface-1',
          error && 'border-error',
          Icon ? 'pl-9 pr-3' : 'px-3',
          className
        )}
        {...props}
      />
      {Icon && (
        <span
          className={cn(
            'absolute left-3 top-1/2 -translate-y-1/2',
            props.disabled && 'opacity-35'
          )}
        >
          <Icon className='size-4' />
        </span>
      )}
    </div>
  )
}

Input.displayName = 'Input'

export {Input}
