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
          'py-3.75 px-4 inline-full min-block-14 block bg-surface-3 border border-transparent font-bold outline-0 transition placeholder:text-sm placeholder:leading-6 not-placeholder-shown:border-border focus:border-border disabled:pointer-events-none disabled:opacity-35',
          error &&
            'border-danger not-placeholder-shown:border-danger focus:border-danger',
          Icon && 'pl-9',
          className
        )}
        rows={rows}
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

export {Textarea}
