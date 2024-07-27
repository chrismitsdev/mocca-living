import * as React from 'react'
import {cn} from '#/lib/utils'

const Card = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>(({className, ...props}, ref) => (
  <div
    className={cn(
      'bg-app-background border rounded shadow transition',
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
      'p-6 flex flex-col gap-1.5', 
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
      'text-2xl font-semibold leading-none tracking-tight',
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
      'text-sm text-foreground-muted', 
      className
    )}
    ref={ref}
    {...props}
  />
))

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>(({className, ...props}, ref) => (
  <div 
    className={cn(
      'px-6', 
      className
    )} 
    ref={ref} 
    {...props} 
  />
))

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>(({className, ...props}, ref) => (
  <div
    className={cn(
      'p-6 flex items-center', 
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
