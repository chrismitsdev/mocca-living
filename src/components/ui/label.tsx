import {Root} from '@radix-ui/react-label'
import {cn} from '@/src/lib/utils'

function Label({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Root>) {
  return (
    <Root
      className={cn('block text-sm font-bold leading-6', className)}
      {...props}
    />
  )
}

Label.displayName = 'Label'

export {Label}
