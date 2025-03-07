import * as React from 'react'
import {Root} from '@radix-ui/react-label'
import {cn} from '@/src/lib/utils'

const Label: React.FC<React.ComponentPropsWithRef<typeof Root>> = ({
  className,
  ...props
}) => {
  return (
    <Root
      className={cn('inline-block text-sm font-semibold', className)}
      {...props}
    />
  )
}

Label.displayName = 'Label'

export {Label}
