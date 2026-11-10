import {cn} from '@/src/lib/utils'

interface TypographyProps extends React.ComponentPropsWithoutRef<'span'> {
  variant?:
    | 'display'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'large'
    | 'p'
    | 'small'
    | 'tiny'
  serif?: boolean
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
}

function Typography({
  className,
  variant = 'p',
  serif,
  as: Comp = 'span',
  ...props
}: TypographyProps) {
  return (
    <Comp
      className={cn(
        'block text-balance',
        serif && 'font-serif',
        variant === 'display' && ['text-4xl', 'sm:text-7xl', 'sm:leading-24'],
        variant === 'h1' && ['text-4xl', 'font-bold'],
        variant === 'h2' && ['text-3xl', 'font-bold'],
        variant === 'h3' && ['text-2xl', 'font-bold'],
        variant === 'h4' && ['text-xl', 'font-bold'],
        variant === 'large' && ['text-base', 'font-bold'],
        variant === 'p' && ['text-base', 'leading-8'],
        variant === 'small' && ['text-sm', 'leading-6'],
        variant === 'tiny' && [
          'text-[10px]',
          'leading-4',
          'font-bold',
          'sm:text-xs'
        ],
        className
      )}
      {...props}
    />
  )
}

export {Typography}
