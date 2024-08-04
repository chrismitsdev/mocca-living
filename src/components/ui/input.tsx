import * as React from 'react'
import {cn} from '#/lib/utils'
import {IconProps} from '@radix-ui/react-icons/dist/types'

type InputProps = React.ComponentPropsWithoutRef<'input'> & {
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>
  icon?: React.ComponentType<IconProps>
}

const Input = React.forwardRef<
  HTMLInputElement, 
  InputProps
>(({className, wrapperProps = {}, type = 'text', icon, ...props}, ref) => {
  const {className: wrapperClassName, ...restWrapperProps} = wrapperProps
  
  return (
    <div 
      className={cn(
        'relative group', 
        wrapperClassName
      )} 
      {...restWrapperProps}
    >
      <input
        className={cn(
          'py-[7px] w-full bg-surface-1 border rounded font-semibold outline-0 transition placeholder:text-sm placeholder:font-normal placeholder:text-foreground-muted placeholder:opacity-100 focus-within:border-border-hover focus-within:shadow disabled:pointer-events-none disabled:opacity-35',
          icon ? 'pl-9 pr-3' : 'px-3',
          className
        )}
        type={type}
        ref={ref}
        {...props}
      />
      {icon && (
        <span className={cn(
          'absolute left-3 top-1/2 -translate-y-1/2',
          props.disabled && 'opacity-35'
        )}>
          {React.createElement(icon, {width: 16, height: 16})}
        </span>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export {Input}
