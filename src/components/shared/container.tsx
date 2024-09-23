import {Slot} from '@radix-ui/react-slot'
import {cn} from '#/lib/utils'

type ContainerProps = React.HTMLAttributes<HTMLElement> & {
  asChild?: boolean
}

function Container({className, asChild = false, ...props}: ContainerProps) {
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      className={cn('container', className)}
      {...props}
    />
  )
}

Container.displayName = 'Container'
export {Container}
