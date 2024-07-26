import * as React from 'react'
import {Slot} from '@radix-ui/react-slot'
import {cva, type VariantProps} from 'class-variance-authority'
import {cn} from '#/lib/utils'

const typographyVariants = cva(
  ['block', 'text-inherit'],
  {
    variants: {
      variant: {
        hero: ['text-5xl', 'font-extrabold', 'lg:text-6xl'],
        h1: ['text-4xl', 'font-extrabold', 'lg:text-5xl'],
        h2: ['pb-2', 'text-3xl', 'font-semibold', 'border-b', 'first:mt-0'],
        h3: ['text-2xl', 'font-semibold'],
        h4: ['text-xl', 'font-semibold'],
        h5: ['text-base', 'font-semibold'],
        blockquote: ['pl-6', 'mt-6', 'italic', 'border-l-2'],
        lead: ['text-xl', 'text-muted-foreground'],
        large: ['text-lg', 'font-semibold'],
        small: ['text-sm'],
        mini: ['text-xs', 'font-medium'],
        muted: ['text-sm', 'text-foreground-muted']
      }
    },
    compoundVariants: [
      {
        variant: ['h1', 'h2', 'h3', 'h4'],
        className: ['scroll-m-20', 'tracking-tight']
      }
    ]
  } 
)

type TypographyProps = 
  React.HTMLAttributes<HTMLElement> 
  & VariantProps<typeof typographyVariants> & {
    asChild?: boolean
  }

const Typography = React.forwardRef<
  HTMLElement,
  TypographyProps
>(({className, variant, asChild, ...props}, ref) => {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp 
      className={cn(typographyVariants({variant, className}))}
      ref={ref}
      {...props} 
    />
  )
})

Typography.displayName = 'Typography'

export {Typography}