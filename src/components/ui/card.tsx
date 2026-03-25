import {cn} from '@/src/lib/utils'

function Card({className, ...props}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={cn('bg-surface-2 border border-border', className)}
      {...props}
    />
  )
}

function CardHeader({className, ...props}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={cn('px-4 pt-4 sm:px-6 sm:pt-6 space-y-4', className)}
      {...props}
    />
  )
}

function CardTitle({className, ...props}: React.ComponentPropsWithRef<'h3'>) {
  return (
    <h3
      className={cn('text-2xl text-balance font-bold', className)}
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
      className={cn('text-sm text-balance', className)}
      {...props}
    />
  )
}

function CardContent({
  className,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={cn('p-4 sm:p-6', className)}
      {...props}
    />
  )
}

function CardFooter({className, ...props}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={cn('px-4 pb-4 sm:px-6 sm:pb-6 flex items-center', className)}
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

export {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle}
