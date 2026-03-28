import {cn} from '@/src/lib/utils'

interface BadgeProps extends React.ComponentPropsWithRef<'span'> {}

function Badge({className, ...props}: BadgeProps) {
  return (
    <span
      className={cn(
        'px-2 py-1.5 inline-flex flex-nowrap items-center justify-center gap-1.5 bg-surface-3 text-sm font-bold *:shrink-0 [&>svg]:size-5',
        className
      )}
      {...props}
    />
  )
}

Badge.displayName = 'Badge'

export {Badge}
