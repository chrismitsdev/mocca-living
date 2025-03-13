import {cn} from '@/src/lib/utils'

const Section: React.FC<React.ComponentPropsWithRef<'section'>> = ({
  className,
  ...props
}) => {
  return (
    <section
      className={cn('py-32', className)}
      {...props}
    />
  )
}

Section.displayName = 'Section'

export {Section}
