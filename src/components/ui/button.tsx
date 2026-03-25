import {Slot} from '@radix-ui/react-slot'
import {cva, type VariantProps} from 'class-variance-authority'
import {Children, cloneElement, Fragment} from 'react'
import {Spinner} from '@/src/components/ui/spinner'

const buttonProps = cva(
  [
    'inline-flex',
    'justify-center',
    'items-center',
    'whitespace-nowrap',
    'font-bold',
    'transition',
    'focus-visible:outline-2',
    'focus-visible:outline-ring',
    'focus-visible:outline-offset-2',
    'aria-disabled:opacity-30'
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-primary',
          'text-primary-foreground',
          'hover:bg-primary-hover',
          'data-open:bg-primary-hover'
        ],
        outline: [
          'bg-surface-1',
          'text-foreground',
          'border',
          'border-border',
          'hover:bg-surface-2',
          'hover:border-border-hover',
          'data-open:bg-surface-2',
          'data-open:border-border-hover'
        ],
        ghost: [
          'text-foreground',
          'hover:bg-primary',
          'hover:text-primary-foreground',
          'data-open:bg-primary',
          'data-open:text-primary-foreground'
        ]
      },
      size: {
        large: ['px-6', 'h-14', 'text-lg', 'gap-x-1.5', '[&_svg]:size-7'],
        normal: ['px-4', 'h-10', 'text-base', 'gap-x-1', '[&_svg]:size-6'],
        small: ['px-2', 'h-6', 'text-sm', 'gap-x-0.5', '[&_svg]:size-5']
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'normal'
    }
  }
)

interface ButtonProps
  extends Omit<
      React.ComponentPropsWithRef<'button'>,
      'aria-busy' | 'aria-disabled'
    >,
    VariantProps<typeof buttonProps> {
  asChild?: boolean
  isLoading?: boolean
}

function Button({
  className,
  variant,
  size,
  disabled,
  type = 'button',
  isLoading = false,
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  const loadingSkeleton = (children: React.ReactNode) => {
    return (
      <Fragment>
        <span className='invisible'>{children}</span>
        <span className='absolute inset-0 flex items-center justify-center'>
          <Spinner />
        </span>
      </Fragment>
    )
  }

  if (asChild && isLoading) {
    const child = Children.only(children) as React.ReactElement<{
      children: React.ReactNode
    }>
    return (
      <Comp
        className={buttonProps({variant, size, className})}
        aria-busy
        aria-disabled
        {...props}
      >
        {cloneElement(child, {}, loadingSkeleton(child.props.children))}
      </Comp>
    )
  }

  return (
    <Comp
      className={buttonProps({variant, size, className})}
      type={asChild ? undefined : type}
      aria-busy={isLoading || undefined}
      aria-disabled={isLoading || disabled || undefined}
      disabled={asChild ? undefined : disabled || isLoading}
      {...props}
    >
      {isLoading ? loadingSkeleton(children) : children}
    </Comp>
  )
}

Button.displayName = 'Button'

export {Button}
