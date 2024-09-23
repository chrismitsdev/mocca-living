import * as React from 'react'
import {Root} from '@radix-ui/react-label'
import {cn} from '#/lib/utils'

const Label = React.forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root>
>(({className, ...props}, ref) => (
  <Root
    className={cn('inline-block text-sm font-semibold', className)}
    ref={ref}
    {...props}
  />
))

Label.displayName = 'Label'

export {Label}
