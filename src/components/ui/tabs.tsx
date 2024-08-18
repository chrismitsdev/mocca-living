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
    className={cn('p-3 flex items-center gap-4 bg-surface-2 rounded shadow', className)}
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
      'px-4 py-[7px]  grow rounded border transition ease-mocca duration-750 data-active:bg-primary data-active:text-primary-foreground data-active:shadow data-inactive:hover:border-primary-hover',
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
    className={cn('p-6 mt-4 bg-surface-2 rounded shadow', className)}
    ref={ref}
    {...props}
  />
))

Tabs.displayName = 'Tabs'
TabsList.displayName = 'TabsList'
TabsTrigger.displayName = 'TabsTrigger'
TabsContent.displayName = 'TabsContent'

export {Tabs, TabsList, TabsTrigger, TabsContent}
