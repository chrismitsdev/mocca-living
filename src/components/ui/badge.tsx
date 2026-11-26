import {cn} from '@/src/lib/utils'

interface BadgeProps extends React.ComponentPropsWithRef<'span'> {
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info'
  size?: 'normal' | 'small'
}

function Badge({
  className,
  variant = 'primary',
  size = 'normal',
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex text-nowrap flex-nowrap items-center justify-center font-semibold border *:shrink-0',
        // VARIANT STYLES: tinted background, dark text, matching border
        variant === 'primary' && [
          'bg-brand-3',
          'text-brand-12',
          'border-brand-6'
        ],
        variant === 'success' && [
          'bg-green-3',
          'text-green-12',
          'border-green-6'
        ],
        variant === 'warning' && [
          'bg-amber-3',
          'text-amber-12',
          'border-amber-6'
        ],
        variant === 'info' && ['bg-blue-3', 'text-blue-12', 'border-blue-6'],
        variant === 'error' && ['bg-red-3', 'text-red-12', 'border-red-6'],
        // SIZE STYLES
        size === 'normal' && [
          'px-2',
          'block-8',
          'gap-1.5',
          'text-sm',
          '[&>svg]:size-5'
        ],
        size === 'small' && [
          'px-1.5',
          'block-6',
          'gap-1',
          'text-xs',
          '[&>svg]:size-4'
        ],
        className
      )}
      {...props}
    />
  )
}

export {Badge}
