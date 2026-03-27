import {Slot} from '@radix-ui/react-slot'
import {cva, type VariantProps} from 'class-variance-authority'
import {cn} from '@/src/lib/utils'

const typographyVariants = cva(['block', 'text-balance'], {
  variants: {
    variant: {
      h1: ['text-4xl'],
      h2: ['text-3xl'],
      h3: ['text-2xl'],
      h4: ['text-xl'],
      large: ['text-base'],
      p: ['text-base', 'leading-8'],
      small: ['text-sm'],
      tiny: ['text-xs']
    }
  },
  compoundVariants: [
    {
      variant: ['h1', 'h2', 'h3', 'h4', 'large', 'tiny'],
      className: 'font-bold'
    },
    {variant: ['small', 'tiny'], className: 'leading-6'}
  ],
  defaultVariants: {
    variant: 'p'
  }
})

interface TypographyProps
  extends React.ComponentPropsWithRef<'span'>,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean
}

function Typography({className, variant, asChild, ...props}: TypographyProps) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      className={cn(typographyVariants({variant, className}))}
      {...props}
    />
  )
}

Typography.displayName = 'Typography'

export {Typography}
