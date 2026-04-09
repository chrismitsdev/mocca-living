import type {IconProps} from '@tabler/icons-react'
import {cn} from '@/src/lib/utils'

interface InputProps extends React.ComponentPropsWithRef<'input'> {
  icon?: React.ComponentType<IconProps>
  error?: boolean
}

function Input({className, error, icon: Icon, ...props}: InputProps) {
  return (
    <div className='relative'>
      <input
        className={cn(
          'py-3.75 w-full block bg-surface-1 border border-border font-bold outline-0 transition placeholder:text-sm focus:border-border-hover focus:shadow-sm disabled:pointer-events-none disabled:opacity-35 autofill:bg-surface-1',
          error && 'border-danger focus:border-danger',
          Icon ? 'pl-9 pr-3.75' : 'px-3.75',
          className
        )}
        aria-invalid={error}
        {...props}
      />
      {Icon && (
        <span
          className={cn(
            'absolute inset-bs-4.5 inset-s-2.5',
            props.disabled && 'opacity-35'
          )}
        >
          <Icon className='size-5' />
        </span>
      )}
    </div>
  )
}

Input.displayName = 'Input'

export {Input}
