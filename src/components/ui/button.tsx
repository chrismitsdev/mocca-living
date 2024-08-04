import * as React from 'react'
import {Slot} from '@radix-ui/react-slot'
import {cva, type VariantProps} from 'class-variance-authority'
import {cn} from '#/lib/utils'

const buttonVariants = cva(
  [
    'inline-flex', 
    'items-center', 
    'justify-center', 
    'gap-2', 
    'whitespace-nowrap', 
    'rounded', 
    'font-semibold', 
    'ring-offset-background', 
    'transition-colors', 
    'focus-visible:outline-none', 
    'focus-visible:ring-2', 
    'focus-visible:ring-ring', 
    'focus-visible:ring-offset-1', 
    'disabled:pointer-events-none', 
    'disabled:opacity-35'
  ],
  {
    variants: {
      variant: {
        primary: ['bg-primary', 'text-primary-foreground', 'hover:bg-primary-hover'],
        bordered: ['border', 'hover:border-border-hover'],
        ghost: ['hover:bg-primary', 'hover:text-primary-foreground'],
        success: ['bg-success', 'text-success-foreground', 'hover:bg-success-hover'],
        error: ['bg-error', 'text-error-foreground', 'hover:bg-error-hover'],
        info: ['bg-info', 'text-info-foreground', 'hover:bg-info-hover'],
        'ghost-success': ['hover:bg-success-hover', 'hover:text-success-foreground'],
        'ghost-error': ['hover:bg-error-hover', 'hover:text-error-foreground'],
        'ghost-info': ['hover:bg-info-hover', 'hover:text-info-foreground'],
        link: ['underline-offset-4', 'hover:underline'],
      },
      size: {
        normal: ['px-4', 'py-2'],
        small: ['px-2', 'py-1.5', 'text-sm'],
        'icon-normal': ['h-10', 'w-10'],
        'icon-small': ['h-8', 'w-8'],
        'icon-mini': ['h-4', 'w-4']
      }
    },
    compoundVariants: [
      {
        variant: ['bordered'],
        size: 'normal',
        className: 'py-[7px]'
      },
      {
        variant: ['bordered'],
        size: 'small',
        className: 'py-[5px]'
      }
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'normal',
    }
  }
)

type ButtonProps = 
  React.ButtonHTMLAttributes<HTMLButtonElement> 
  & VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

const Button = React.forwardRef<
  HTMLButtonElement, 
  ButtonProps
>(({asChild = false, className, variant, size, type = 'button', ...props}, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(buttonVariants({variant, size, className}))}
        type={type}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export {Button, buttonVariants}
