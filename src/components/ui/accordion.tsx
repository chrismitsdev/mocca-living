'use client'

import * as React from 'react'
import {Root, Item, Header, Trigger, Content} from '@radix-ui/react-accordion'
import {ChevronRight} from 'lucide-react'
import {cn} from '#/lib/utils'

const Accordion = React.forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root>
>(({...props}, ref) => (
  <Root
    ref={ref}
    {...props}
  />
))

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof Item>,
  React.ComponentPropsWithoutRef<typeof Item>
>(({className, ...props}, ref) => (
  <Item
    className={cn(
      'p-0.5 bg-surface-2 rounded border border-surface-3 shadow group',
      className
    )}
    ref={ref}
    {...props}
  />
))

const AccordionHeader = React.forwardRef<
  React.ElementRef<typeof Header>,
  React.ComponentPropsWithoutRef<typeof Header>
>(({asChild = true, children, ...props}, ref) => (
  <Header
    asChild={asChild}
    ref={ref}
    {...props}
  >
    <h6>{children}</h6>
  </Header>
))

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof Trigger>,
  React.ComponentPropsWithoutRef<typeof Trigger>
>(({className, children, ...props}, ref) => (
  <AccordionHeader>
    <Trigger
      className={cn(
        'px-4 py-3 w-full flex items-center justify-between gap-4 font-semibold rounded transition group-data-open:bg-surface-3 hover:bg-surface-3',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
      <ChevronRight className='shrink-0 group-data-open:rotate-90 group-data-open:duration-750 group-data-closed:duration-375 ease-mocca' />
    </Trigger>
  </AccordionHeader>
))

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(({className, ...props}, ref) => (
  <Content
    className={cn(
      'overflow-hidden group-data-open:animate-accordion-open group-data-closed:animate-accordion-close',
      className
    )}
    ref={ref}
    {...props}
  />
))

Accordion.displayName = 'Accordion'
AccordionItem.displayName = 'AccordionItem'
AccordionHeader.displayName = 'AccordionHeader'
AccordionTrigger.displayName = 'AccordionTrigger'
AccordionContent.displayName = 'AccordionContent'

export {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent
}
