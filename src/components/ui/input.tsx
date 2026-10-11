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
          'py-3.75 px-4 inline-full block bg-surface-3 border font-bold outline-0 transition placeholder:text-sm placeholder:leading-6 disabled:pointer-events-none disabled:opacity-35',
          error && 'border-danger',
          Icon && 'pl-9',
          className
        )}
        {...props}
      />
      {Icon && (
        <span
          className={cn(
            'absolute inset-bs-4 inset-s-2.5',
            props.disabled && 'opacity-35'
          )}
        >
          <Icon className='inline-5 block-lh' />
        </span>
      )}
    </div>
  )
}

export {Input}
