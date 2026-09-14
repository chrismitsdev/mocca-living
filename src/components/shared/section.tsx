import {cn} from '@/src/lib/utils'

function Section({
  className,
  ...props
}: React.ComponentPropsWithRef<'section'>) {
  return (
    <section
      className={cn('py-32 bg-surface-1', className)}
      {...props}
    />
  )
}

export {Section}
