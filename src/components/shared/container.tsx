import {Slot} from '@radix-ui/react-slot'
import {cn} from '@/src/lib/utils'

interface ContainerProps extends React.ComponentPropsWithRef<'div'> {
  asChild?: boolean
}

const Container: React.FC<ContainerProps> = ({
  className,
  asChild = false,
  ...props
}) => {
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      className={cn('px-3 container mx-auto', className)}
      {...props}
    />
  )
}

Container.displayName = 'Container'

export {Container}
