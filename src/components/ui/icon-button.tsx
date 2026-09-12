import {Slot} from 'radix-ui'
import {cn} from '@/src/lib/utils'

interface IconButtonProps
  extends Omit<
    React.ComponentPropsWithRef<'button'>,
    'aria-label' | 'aria-disabled'
  > {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'large' | 'normal' | 'small'
  'aria-label': string
  asChild?: boolean
}

function IconButton({
  className,
  disabled,
  variant = 'primary',
  size = 'normal',
  type = 'button',
  asChild = false,
  ...props
}: IconButtonProps) {
  const Comp = asChild ? Slot.Root : 'button'

  return (
    <Comp
      className={cn(
        'shrink-0 inline-flex items-center justify-center transition focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 aria-disabled:opacity-30',
        // VARIANT STYLING
        variant === 'primary' && [
          'bg-primary',
          'text-primary-foreground',
          'hover:bg-primary-hover',
          'data-open:bg-primary-hover'
        ],
        variant === 'outline' && [
          'bg-surface-1',
          'text-foreground',
          'border',
          'border-border',
          'hover:bg-surface-2',
          'hover:border-border-hover',
          'data-open:bg-surface-2',
          'data-open:border-border-hover'
        ],
        variant === 'ghost' && [
          'text-foreground',
          'hover:bg-primary',
          'hover:text-primary-foreground',
          'data-open:bg-primary',
          'data-open:text-primary-foreground'
        ],
        // SIZE STYLING
        size === 'large' && ['size-12', '[&>svg]:size-7'],
        size === 'normal' && ['size-10', '[&>svg]:size-6'],
        size === 'small' && ['size-8', '[&>svg]:size-5'],
        className
      )}
      aria-disabled={disabled}
      type={asChild ? undefined : type}
      disabled={asChild ? undefined : disabled}
      {...props}
    />
  )
}

export {IconButton}
