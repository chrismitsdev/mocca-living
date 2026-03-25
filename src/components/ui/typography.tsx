import {Slot} from '@radix-ui/react-slot'
import {cva, type VariantProps} from 'class-variance-authority'
import {cn} from '@/src/lib/utils'

const typographyVariants = cva(['block', 'text-balance'], {
  variants: {
    variant: {
      h1: ['text-5xl'],
      h2: ['text-4xl'],
      h3: ['text-3xl'],
      h4: ['text-2xl'],
      lead: ['text-xl'],
      large: ['text-base'],
      p: ['text-base'],
      small: ['text-sm'],
      tiny: ['text-xs'],
      mini: ['text-[10px]', 'leading-4', 'tracking-wider']
    }
  },
  compoundVariants: [
    {
      variant: ['h1', 'h2', 'h3', 'h4', 'lead', 'large'],
      className: 'font-bold'
    },
    {variant: ['p', 'small', 'tiny'], className: 'leading-6'}
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
