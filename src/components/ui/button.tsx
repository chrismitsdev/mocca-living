import * as React from 'react'
import {Slot, Slottable} from '@radix-ui/react-slot'
import {cva, type VariantProps} from 'class-variance-authority'
import {Spinner} from '@/components/ui/spinner'
import {cn} from '#/lib/utils'

const buttonVariants = cva(
  [
    'relative',
    'inline-flex',
    'justify-center',
    'items-center',
    'gap-2',
    'whitespace-nowrap',
    'font-semibold',
    '[&>*]:shrink-0',
    'rounded',
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
        'primary-alt': ['bg-surface-1', 'text-primary', 'hover:bg-surface-2'],
        bordered: ['border', 'hover:border-border-hover'],
        ghost: ['hover:bg-primary', 'hover:text-primary-foreground'],
        success: ['bg-success', 'text-success-foreground', 'hover:bg-success-hover'],
        error: ['bg-error', 'text-error-foreground', 'hover:bg-error-hover'],
        info: ['bg-info', 'text-info-foreground', 'hover:bg-info-hover'],
        warning: ['bg-warning', 'text-warning-foreground', 'hover:bg-warning-hover'],
        'ghost-success': ['hover:bg-success-hover', 'hover:text-success-foreground'],
        'ghost-error': ['hover:bg-error-hover', 'hover:text-error-foreground'],
        'ghost-info': ['hover:bg-info-hover', 'hover:text-info-foreground'],
        'ghost-warning': ['hover:bg-warning-hover', 'hover:text-warning-foreground'],
        link: ['underline-offset-4', 'hover:underline']
      },
      size: {
        large: ['px-6', 'py-3', 'text-lg'],
        normal: ['px-4', 'py-2'],
        small: ['px-2', 'py-1.5', 'text-sm', 'gap-1'],
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
      size: 'normal'
    }
  }
)

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    isLoading?: boolean
  }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {variant, size, className, asChild = false, isLoading = false, type = 'button', children, ...props},
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size,
            className: cn(isLoading && '[&>*:not(span:last-child)]:invisible', className)
          })
        )}
        type={type}
        ref={ref}
        {...props}
      >
        <Slottable>{children}</Slottable>
        {isLoading && (
          <span className='absolute inset-0 flex items-center justify-center'>
            <Spinner size={size === 'large' ? 24 : 16} />
          </span>
        )}
      </Comp>
    )
  }
)

Button.displayName = 'Button'

export {Button, buttonVariants}
