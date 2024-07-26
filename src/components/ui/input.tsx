import * as React from 'react'
import {cn} from '#/lib/utils'

type InputProps = React.ComponentPropsWithoutRef<'input'>

const Input = React.forwardRef<
  HTMLInputElement, 
  InputProps
>(({className, type, ...props}, ref) => {
  return (
    <input
      className={cn(
        'px-3 py-1.5 w-full bg-app-background border-2 rounded outline-0 font-medium transition placeholder:font-normal placeholder:text-foreground-muted placeholder:opacity-100 focus-within:border-border-hover focus-within:shadow-md disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      type={type}
      ref={ref}
      {...props}
    />
  )
})

Input.displayName = 'Input'

export {Input}
