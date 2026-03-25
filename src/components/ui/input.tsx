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
          'py-1.75 w-full block bg-surface-1 border border-border font-bold outline-0 transition placeholder:text-sm placeholder:font-normal focus:border-border-hover focus:shadow disabled:pointer-events-none disabled:opacity-35 autofill:bg-surface-1',
          error && 'border-danger',
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
