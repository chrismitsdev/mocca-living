import type {LucideProps} from 'lucide-react'
import {cn} from '@/src/lib/utils'

interface TextareaProps extends React.ComponentPropsWithRef<'textarea'> {
  wrapperProps?: React.ComponentPropsWithRef<'div'>
  icon?: React.ComponentType<LucideProps>
  error?: boolean
}

function Textarea({
  className,
  wrapperProps = {},
  error,
  icon: Icon,
  rows = 4,
  ...props
}: TextareaProps) {
  const {className: wrapperClassName, ...restWrapperProps} = wrapperProps

  return (
    <div
      className={cn('relative group', wrapperClassName)}
      {...restWrapperProps}
    >
      <textarea
        className={cn(
          'py-1.75 w-full block bg-surface-1 border border-border rounded font-semibold outline-0 transition placeholder:text-sm placeholder:font-normal placeholder:text-foreground-muted placeholder:opacity-100 focus-within:border-border-hover focus-within:shadow disabled:pointer-events-none disabled:opacity-35',
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
