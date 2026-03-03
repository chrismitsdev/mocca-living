import {cn} from '@/src/lib/utils'

function Section({
  className,
  ...props
}: React.ComponentPropsWithRef<'section'>) {
  return (
    <section
      className={cn('py-32', className)}
      {...props}
    />
  )
}

Section.displayName = 'Section'

export {Section}
