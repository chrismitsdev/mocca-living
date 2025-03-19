import * as React from 'react'
import {Root} from '@radix-ui/react-label'
import {cn} from '@/src/lib/utils'

const Label: React.FC<React.ComponentPropsWithRef<typeof Root>> = ({
  className,
  ...props
}) => {
  return (
    <Root
      className={cn('block text-sm font-semibold select-none', className)}
      {...props}
    />
  )
}

Label.displayName = 'Label'

export {Label}
