import type {IconProps} from '@tabler/icons-react'
import {cn} from '@/src/lib/utils'

interface TextareaProps extends React.ComponentPropsWithRef<'textarea'> {
  icon?: React.ComponentType<IconProps>
  error?: boolean
}

function Textarea({
  className,
  error,
  icon: Icon,
  rows = 4,
  ...props
}: TextareaProps) {
  return (
    <div className='relative group'>
      <textarea
        className={cn(
          'py-1.75 w-full block bg-surface-1 border border-border font-bold outline-0 transition placeholder:text-sm placeholder:font-normal focus:border-border-hover focus:shadow disabled:pointer-events-none disabled:opacity-35',
          error && 'border-error',
          Icon ? 'pl-9 pr-3' : 'px-3',
          className
        )}
        rows={rows}
        {...props}
      />
      {Icon && (
        <span
          className={cn(
            'absolute left-3 top-3',
            props.disabled && 'opacity-35'
          )}
        >
          <Icon className='size-4' />
        </span>
      )}
    </div>
  )
}

Textarea.displayName = 'Textarea'

export {Textarea}
