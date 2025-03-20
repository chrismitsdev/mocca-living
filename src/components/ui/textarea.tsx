import * as React from 'react'
import {type LucideProps} from 'lucide-react'
import {cn} from '@/src/lib/utils'

interface TextareaProps extends React.ComponentPropsWithRef<'textarea'> {
  wrapperProps?: React.ComponentPropsWithRef<'div'>
  icon?: React.ComponentType<LucideProps>
  error?: boolean
}

const Textarea: React.FC<TextareaProps> = ({
  className,
  wrapperProps = {},
  error,
  icon,
  rows = 4,
  ...props
}) => {
  const {className: wrapperClassName, ...restWrapperProps} = wrapperProps

  return (
    <div
      className={cn('relative group', wrapperClassName)}
      {...restWrapperProps}
    >
      <textarea
        className={cn(
          'py-[7px] w-full block bg-surface-1 border border-border rounded font-semibold outline-0 transition placeholder:text-sm placeholder:font-normal placeholder:text-foreground-muted placeholder:opacity-100 focus-within:border-border-hover focus-within:shadow disabled:pointer-events-none disabled:opacity-35',
          error && 'border-error',
          icon ? 'pl-9 pr-3' : 'px-3',
          className
        )}
        rows={rows}
        {...props}
      />
      {icon && (
        <span
          className={cn(
            'absolute left-3 top-[11px]',
            props.disabled && 'opacity-35'
          )}
        >
          {React.createElement(icon, {width: 16, height: 16})}
        </span>
      )}
    </div>
  )
}

Textarea.displayName = 'Textarea'

export {Textarea}
