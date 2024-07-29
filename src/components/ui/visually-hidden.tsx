import * as React from 'react'
import {Root} from '@radix-ui/react-visually-hidden'

const VisuallyHidden = React.forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root>
>((props, ref) => (
  <Root ref={ref} {...props} />
))

VisuallyHidden.displayName = 'VisuallyHidden'

export {VisuallyHidden}