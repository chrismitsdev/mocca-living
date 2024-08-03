import * as React from 'react'
import {Typography} from '@/components/ui/typography'
import {cn} from '#/lib/utils'

type FormControlProps = React.ComponentPropsWithoutRef<'div'> & {
  error?: string
}

const FormControl = React.forwardRef<
  HTMLDivElement, 
  FormControlProps
>(({className, error, children, ...props}, ref) => {
  return (
    <div 
      className={cn(
        'space-y-0 min-h-20', 
        className
      )} 
      ref={ref}
      {...props}
    >
      {children}
      {error && (
        <Typography 
          className='text-right text-error-foreground' 
          variant='mini'
        >
          {error}
        </Typography>
      )}
    </div>
  )
})

FormControl.displayName = 'FormControl'

export {FormControl}