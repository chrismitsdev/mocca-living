import * as React from 'react'
import {cn} from '@/src/lib/utils'

const Card: React.FC<React.ComponentPropsWithRef<'div'>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'p-6 space-y-6 bg-surface-2 rounded border border-surface-3',
        className
      )}
      {...props}
    />
  )
}

const CardHeader: React.FC<React.ComponentPropsWithRef<'div'>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn('space-y-2', className)}
      {...props}
    />
  )
}

const CardTitle: React.FC<React.ComponentPropsWithRef<'h3'>> = ({
  className,
  ...props
}) => {
  return (
    <h3
      className={cn('text-2xl font-semibold', className)}
      {...props}
    />
  )
}

const CardDescription: React.FC<React.ComponentPropsWithRef<'p'>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn('text-sm tracking-wide', className)}
      {...props}
    />
  )
}

const CardContent: React.FC<React.ComponentPropsWithRef<'div'>> = (props) => {
  return <div {...props} />
}

const CardFooter: React.FC<React.ComponentPropsWithRef<'div'>> = ({
  className,
  ...props
}) => {
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
