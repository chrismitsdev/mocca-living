import type {IconProps} from '@tabler/icons-react'
import {cn} from '@/src/lib/utils'

interface InputProps extends React.ComponentPropsWithRef<'input'> {
  icon?: React.ComponentType<IconProps>
  error?: boolean
}

function Input({className, error, icon: Icon, ...props}: InputProps) {
  // Date and time inputs have no placeholder, so :placeholder-shown never
  // matches them. A required one is :valid once it holds a value instead, and
  // while empty its "mm/dd/yyyy" or "--:--" takes the placeholder colour
  const dateOrTime = props.type === 'date' || props.type === 'time'

  return (
    <div className='relative'>
      <input
        className={cn(
          'py-3.75 px-4 appearance-none inline-full block bg-surface-3 border border-transparent font-bold outline-0 transition placeholder:text-sm placeholder:leading-6 focus:border-surface-4 disabled:pointer-events-none disabled:opacity-35',
          dateOrTime
            ? 'valid:border-surface-4 invalid:text-[color-mix(in_oklab,currentcolor_50%,transparent)]'
            : 'not-placeholder-shown:border-surface-4',
          error && 'border-danger focus:border-danger',
          error &&
            (dateOrTime
              ? 'valid:border-danger'
              : 'not-placeholder-shown:border-danger'),
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
          <Icon
            className='inline-5 block-lh'
            aria-hidden
          />
        </span>
      )}
    </div>
  )
}

export {Input}
