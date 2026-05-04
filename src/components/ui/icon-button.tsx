import {Slot} from '@radix-ui/react-slot'
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
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      className={cn(
        'inline-flex items-center justify-center transition focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 aria-disabled:opacity-30',
        // primary
        'data-variant-primary:bg-primary data-variant-primary:text-primary-foreground data-variant-primary:hover:bg-primary-hover data-variant-primary:data-open:bg-primary-hover',
        // outline
        'data-variant-outline:bg-surface-1 data-variant-outline:text-foreground data-variant-outline:border data-variant-outline:border-border data-variant-outline:hover:bg-surface-2 data-variant-outline:hover:border-border-hover data-variant-outline:data-open:bg-surface-2 data-variant-outline:data-open:border-border-hover',
        // ghost
        'data-variant-ghost:text-foreground data-variant-ghost:hover:bg-primary data-variant-ghost:hover:text-primary-foreground data-variant-ghost:data-open:bg-primary data-variant-ghost:data-open:text-primary-foreground',
        // large
        'data-size-large:size-12 data-size-large:[&>svg]:size-7',
        // normal
        'data-size-normal:size-10 data-size-normal:[&>svg]:size-6',
        // small
        'data-size-small:size-8 data-size-small:[&>svg]:size-5',
        className
      )}
      aria-disabled={disabled}
      type={asChild ? undefined : type}
      disabled={asChild ? undefined : disabled}
      data-variant={variant}
      data-size={size}
      {...props}
    />
  )
}

IconButton.displayName = 'IconButton'

export {IconButton}
