import {Slot} from 'radix-ui'
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
  const Comp = asChild ? Slot.Root : 'span'

  return (
    <Comp
      className={cn(
        'block text-balance',
        variant === 'h1' && ['text-4xl', 'font-bold'],
        variant === 'h2' && ['text-3xl', 'font-bold'],
        variant === 'h3' && ['text-2xl', 'font-bold'],
        variant === 'h4' && ['text-xl', 'font-bold'],
        variant === 'large' && ['text-bas', 'font-bold'],
        variant === 'p' && ['text-base', 'leading-8'],
        variant === 'small' && ['text-sm', 'leading-6'],
        variant === 'tiny' && ['text-xs', 'font-bold', 'leading-6'],
        className
      )}
      {...props}
    />
  )
}

export {Typography}
