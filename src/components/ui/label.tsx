import {Label as RadixLabel} from 'radix-ui'
import {cn} from '@/src/lib/utils'

function Label({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof RadixLabel.Root>) {
  return (
    <RadixLabel.Root
      className={cn('block text-sm font-bold leading-6', className)}
      {...props}
    />
  )
}

Label.displayName = 'Label'

export {Label}
