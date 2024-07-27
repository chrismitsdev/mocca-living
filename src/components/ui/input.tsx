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
        'px-3 py-[7px] w-full bg-app-background border rounded font-semibold outline-0 transition placeholder:font-normal placeholder:text-foreground-muted placeholder:opacity-100 focus-within:border-border-hover focus-within:shadow disabled:cursor-not-allowed disabled:opacity-50',
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
