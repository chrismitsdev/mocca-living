import * as React from 'react'
import {cn} from '#/lib/utils'
import {IconProps} from '@radix-ui/react-icons/dist/types'

type TextareaProps = React.ComponentPropsWithoutRef<'textarea'> & {
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>
  icon?: React.ComponentType<IconProps>
}

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({className, wrapperProps = {}, icon, rows = 3, ...props}, ref) => {
  const {className: wrapperClassName, ...restWrapperProps} = wrapperProps
  
  return (
    <div 
      className={cn(
        'relative', 
        wrapperClassName
      )} 
      {...restWrapperProps}
    >
      <textarea 
        className={cn(
          'py-[7px] w-full block bg-app-background border rounded font-semibold outline-0 transition placeholder:text-sm placeholder:font-normal placeholder:text-foreground-muted placeholder:opacity-100 focus-within:border-border-hover focus-within:shadow disabled:cursor-not-allowed disabled:opacity-50',
          icon ? 'pl-9 pr-3' : 'px-3',
          className
        )}
        rows={rows}
        ref={ref}
        {...props}
      />
      {icon && (
        <span className='absolute left-3 top-[11px]'>
          {React.createElement(icon, {width: 16, height: 16})}
        </span>
      )}
    </div>
  )
})

Textarea.displayName = 'Textarea'

export {Textarea}