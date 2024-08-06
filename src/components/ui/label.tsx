'use client'

import * as React from 'react'
import {Root} from '@radix-ui/react-label'
import {cn} from '#/lib/utils'

type LabelProps = React.ComponentPropsWithoutRef<'label'>

const Label = React.forwardRef<
  React.ElementRef<typeof Root>,
  LabelProps
>(({className, ...props}, ref) => (
  <Root
    className={cn(
      'inline-block font-semibold', 
      className
    )}
    ref={ref}
    {...props}
  />
))

Label.displayName = 'Label'

export {Label}
