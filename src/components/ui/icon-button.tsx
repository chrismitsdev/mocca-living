import {Slot} from '@radix-ui/react-slot'
import {cva, type VariantProps} from 'class-variance-authority'

const iconButtonProps = cva(
  [
    'inline-flex',
    'items-center',
    'justify-center',
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
        large: ['size-12', '[&>svg]:size-7'],
        normal: ['size-10', '[&>svg]:size-6'],
        small: ['size-8', '[&>svg]:size-5']
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'normal'
    }
  }
)

interface IconButtonProps
  extends Omit<
      React.ComponentPropsWithRef<'button'>,
      'aria-label' | 'aria-disabled'
    >,
    VariantProps<typeof iconButtonProps> {
  'aria-label': string
  asChild?: boolean
}

function IconButton({
  className,
  variant,
  size,
  disabled,
  type = 'button',
  asChild = false,
  ...props
}: IconButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      className={iconButtonProps({variant, size, className})}
      type={asChild ? undefined : type}
      aria-disabled={disabled}
      disabled={asChild ? undefined : disabled}
      {...props}
    />
  )
}

IconButton.displayName = 'IconButton'

export {IconButton}
