'use client'

import * as React from 'react'
import {Root, List, Trigger, Content} from '@radix-ui/react-tabs'
import {cn} from '#/lib/utils'

const Tabs = Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof List>,
  React.ComponentPropsWithoutRef<typeof List>
>(({className, ...props}, ref) => (
  <List
    className={cn(
      'p-1 inline-flex items-center justify-center rounded-md bg-muted text-muted-foreground',
      className
    )}
    ref={ref}
    {...props}
  />
))

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof Trigger>,
  React.ComponentPropsWithoutRef<typeof Trigger>
>(({className, ...props}, ref) => (
  <Trigger
    className={cn(
      'px-3 py-1.5 inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-active:bg-background data-active:text-foreground data-active:shadow',
      className
    )}
    ref={ref}
    {...props}
  />
))

const TabsContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(({className, ...props}, ref) => (
  <Content
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className
    )}
    ref={ref}
    {...props}
  />
))

Tabs.displayName = 'Tabs'
TabsList.displayName = 'TabsList'
TabsTrigger.displayName = 'TabsTrigger'
TabsContent.displayName = 'TabsContent'

export {Tabs, TabsList, TabsTrigger, TabsContent}
