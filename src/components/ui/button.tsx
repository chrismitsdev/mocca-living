import {Slot} from 'radix-ui'
import {Spinner} from '@/src/components/ui/spinner'
import {cn} from '@/src/lib/utils'

type ButtonProps = Omit<
  React.ComponentPropsWithRef<'button'>,
  'aria-busy' | 'aria-disabled'
> & {
  variant?: 'primary' | 'secondary' | 'ghost'
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
  const Comp = asChild ? Slot.Root : 'button'

  return (
    <Comp
      className={cn(
        'shrink-0 relative inline-flex justify-center items-center whitespace-nowrap font-bold focus-ring aria-disabled:opacity-30 aria-disabled:pointer-events-none',
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
        size === 'large' && [
          'px-6',
          'block-12',
          'text-lg',
          'gap-x-1.5',
          '[&_svg]:size-6'
        ],
        size === 'normal' && [
          'px-4',
          'block-10',
          'text-base',
          'gap-x-1',
          '[&_svg]:size-5'
        ],
        size === 'small' && [
          'px-2',
          'block-8',
          'text-sm',
          'gap-x-0.5',
          '[&_svg]:size-4'
        ],
        className
      )}
      aria-busy={isLoading || undefined}
      aria-disabled={disabled || isLoading || undefined}
      type={asChild ? undefined : type}
      disabled={asChild ? undefined : disabled || isLoading}
      {...props}
    >
      <Slot.Slottable>
        {isLoading ? (
          <span className='invisible inline-flex justify-center items-center gap-x-[inherit]'>
            {children}
          </span>
        ) : (
          children
        )}
      </Slot.Slottable>
      {isLoading && (
        <span className='absolute inset-0 flex items-center justify-center'>
          <Spinner />
        </span>
      )}
    </Comp>
  )
}

export {Button}
