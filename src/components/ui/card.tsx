import {cn} from '@/src/lib/utils'

function Card({className, ...props}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={cn(
        'p-6 space-y-6 bg-surface-2 border border-surface-3 rounded',
        className
      )}
      {...props}
    />
  )
}

function CardHeader({className, ...props}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={cn('space-y-2', className)}
      {...props}
    />
  )
}

function CardTitle({className, ...props}: React.ComponentPropsWithRef<'h3'>) {
  return (
    <h3
      className={cn('text-2xl font-semibold text-balance', className)}
      {...props}
    />
  )
}

function CardDescription({
  className,
  ...props
}: React.ComponentPropsWithRef<'p'>) {
  return (
    <p
      className={cn('text-sm tracking-wide', className)}
      {...props}
    />
  )
}

function CardContent(props: React.ComponentPropsWithRef<'div'>) {
  return <div {...props} />
}

function CardFooter({className, ...props}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={cn('pt-2 flex items-center', className)}
      {...props}
    />
  )
}

Card.displayName = 'Card'
CardHeader.displayName = 'CardHeader'
CardTitle.displayName = 'CardTitle'
CardDescription.displayName = 'CardDescription'
CardContent.displayName = 'CardContent'
CardFooter.displayName = 'CardFooter'

export {Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent}
