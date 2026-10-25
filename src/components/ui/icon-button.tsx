import {Slot} from 'radix-ui'
import {cn} from '@/src/lib/utils'

interface IconButtonProps
  extends Omit<React.ComponentPropsWithRef<'button'>, 'aria-label'> {
  'aria-label': string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'large' | 'normal' | 'small'
  asChild?: boolean
}

function IconButton({
  className,
  'aria-disabled': ariaDisabled,
  variant = 'primary',
  size = 'normal',
  type = 'button',
  disabled,
  asChild = false,
  ...props
}: IconButtonProps) {
  const Comp = asChild ? Slot.Root : 'button'

  return (
    <Comp
      className={cn(
        'shrink-0 inline-flex items-center justify-center focus-ring disabled:opacity-30',
        // VARIANT STYLES
        variant === 'primary' && [
          'bg-primary',
          'text-primary-foreground',
          'hover:bg-primary-hover',
          'focus-visible:bg-primary-hover',
          'data-open:bg-primary-hover'
        ],
        variant === 'secondary' && [
          'bg-surface-4',
          'text-primary',
          'border',
          'border-surface-5',
          'hover:bg-surface-5',
          'focus-visible:bg-surface-5',
          'data-open:bg-surface-5'
        ],
        variant === 'ghost' && [
          'bg-transparent',
          'text-foreground',
          'hover:bg-primary',
          'hover:text-primary-foreground',
          'focus-visible:bg-primary',
          'focus-visible:text-primary-foreground',
          'data-open:bg-primary',
          'data-open:text-primary-foreground'
        ],
        // SIZE STYLES
        size === 'large' && ['size-12', '[&>svg]:size-7'],
        size === 'normal' && ['size-10', '[&>svg]:size-6'],
        size === 'small' && ['size-8', '[&>svg]:size-5'],
        className
      )}
      aria-disabled={ariaDisabled || disabled}
      type={asChild ? undefined : type}
      disabled={asChild ? undefined : disabled}
      {...props}
    />
  )
}

export {IconButton}
