import * as React from 'react'
import {cn} from '#/lib/utils'

const Card = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>(({className, ...props}, ref) => (
  <div
    className={cn(
      'p-6 space-y-6 bg-app-background border border-border-muted rounded shadow',
      className
    )}
    ref={ref}
    {...props}
  />
))

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>(({className, ...props}, ref) => (
  <div
    className={cn(
      'space-y-1.5', 
      className
    )}
    ref={ref}
    {...props}
  />
))

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<'h3'>
>(({className, ...props}, ref) => (
  <h3
    className={cn(
      'text-2xl font-semibold',
      className
    )}
    ref={ref}
    {...props}
  />
))

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<'p'>
>(({className, ...props}, ref) => (
  <p
    className={cn(
      'text-sm tracking-wide', 
      className
    )}
    ref={ref}
    {...props}
  />
))

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>(({...props}, ref) => (
  <div ref={ref} {...props} />
))

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>(({className, ...props}, ref) => (
  <div
    className={cn(
      'pt-2 flex items-center', 
      className
    )}
    ref={ref}
    {...props}
  />
))

Card.displayName = 'Card'
CardHeader.displayName = 'CardHeader'
CardTitle.displayName = 'CardTitle'
CardDescription.displayName = 'CardDescription'
CardContent.displayName = 'CardContent'
CardFooter.displayName = 'CardFooter'

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent 
}
