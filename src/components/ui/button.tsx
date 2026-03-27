import {Slot, Slottable} from '@radix-ui/react-slot'
import {Spinner} from '@/src/components/ui/spinner'
import {cn} from '@/src/lib/utils'

type ButtonProps = Omit<
  React.ComponentPropsWithRef<'button'>,
  'aria-busy' | 'aria-disabled'
> & {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'large' | 'normal' | 'small'
} & (
    | {
        asChild?: false
        isLoading?: boolean
      }
    | {
        asChild?: true
        isLoading?: never
      }
  )

function Button({
  className,
  disabled,
  variant = 'primary',
  size = 'normal',
  type = 'button',
  isLoading = false,
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      className={cn(
        'relative inline-flex justify-center items-center whitespace-nowrap font-bold transition focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 aria-disabled:opacity-30 aria-disabled:pointer-events-none',
        // primary
        'data-variant-primary:bg-primary data-variant-primary:text-primary-foreground data-variant-primary:hover:bg-primary-hover data-variant-primary:data-open:bg-primary-hover',
        // outline
        'data-variant-outline:bg-surface-1 data-variant-outline:text-foreground data-variant-outline:border data-variant-outline:border-border data-variant-outline:hover:bg-surface-3 data-variant-outline:hover:border-border-hover data-variant-outline:data-open:bg-surface-3 data-variant-outline:data-open:border-border-hover',
        // ghost
        'data-variant-ghost:text-foreground data-variant-ghost:hover:bg-primary data-variant-ghost:hover:text-primary-foreground data-variant-ghost:data-open:bg-primary data-variant-ghost:data-open:text-primary-foreground',
        // large
        'data-size-large:px-6 data-size-large:h-14 data-size-large:text-lg data-size-large:gap-x-1.5 data-size-large:[&_svg]:size-6',
        // normal
        'data-size-normal:px-4 data-size-normal:h-10 data-size-normal:text-base data-size-normal:gap-x-1 data-size-normal:[&_svg]:size-5',
        // small
        'data-size-small:px-2 data-size-small:h-6 data-size-small:text-sm data-size-small:gap-x-0.5 data-size-small:[&_svg]:size-4',
        className
      )}
      aria-busy={isLoading || undefined}
      aria-disabled={isLoading || disabled || undefined}
      type={asChild ? undefined : type}
      disabled={asChild ? undefined : disabled || isLoading}
      data-variant={variant}
      data-size={size}
      {...props}
    >
      <Slottable>
        {isLoading ? <span className='invisible'>{children}</span> : children}
      </Slottable>
      {isLoading && (
        <span className='absolute inset-0 flex items-center justify-center'>
          <Spinner />
        </span>
      )}
    </Comp>
  )
}

Button.displayName = 'Button'

export {Button}
