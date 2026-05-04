import {Slot} from '@radix-ui/react-slot'
import {cn} from '@/src/lib/utils'

interface TypographyProps extends React.ComponentPropsWithRef<'span'> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'large' | 'p' | 'small' | 'tiny'
  asChild?: boolean
}

function Typography({
  className,
  variant = 'p',
  asChild = false,
  ...props
}: TypographyProps) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      className={cn(
        'block text-balance',
        'data-[variant="h1"]:text-4xl data-[variant="h1"]:font-bold',
        'data-[variant="h2"]:text-3xl data-[variant="h2"]:font-bold',
        'data-[variant="h3"]:text-2xl data-[variant="h3"]:font-bold',
        'data-[variant="h4"]:text-xl data-[variant="h4"]:font-bold',
        'data-[variant="large"]:text-base data-[variant="large"]:font-bold',
        'data-[variant="p"]:text-base data-[variant="p"]:leading-8',
        'data-[variant="small"]:text-sm data-[variant="small"]:leading-6',
        'data-[variant="tiny"]:text-xs data-[variant="tiny"]:font-bold data-[variant="tiny"]:leading-6',
        className
      )}
      data-variant={variant}
      {...props}
    />
  )
}

Typography.displayName = 'Typography'

export {Typography}
