'use client'

import {Content, Header, Item, Root, Trigger} from '@radix-ui/react-accordion'
import {ChevronRight} from 'lucide-react'
import type * as React from 'react'
import {cn} from '@/src/lib/utils'

const Accordion: React.FC<React.ComponentPropsWithRef<typeof Root>> = ({
  ...props
}) => {
  return <Root {...props} />
}

const AccordionItem: React.FC<React.ComponentPropsWithRef<typeof Item>> = ({
  className,
  ...props
}) => {
  return (
    <Item
      className={cn(
        'p-0.5 bg-surface-2 rounded border border-surface-3 shadow group',
        className
      )}
      {...props}
    />
  )
}

const AccordionHeader: React.FC<
  React.ComponentPropsWithoutRef<typeof Header>
> = ({asChild = true, children, ...props}) => {
  return (
    <Header
      asChild={asChild}
      {...props}
    >
      <h6>{children}</h6>
    </Header>
  )
}

const AccordionTrigger: React.FC<
  React.ComponentPropsWithRef<typeof Trigger>
> = ({className, children, ...props}) => {
  return (
    <AccordionHeader>
      <Trigger
        className={cn(
          'px-4 py-3 w-full flex items-center gap-4 rounded transition group-data-open:bg-surface-3 hover:bg-surface-3',
          className
        )}
        {...props}
      >
        {children}
        <ChevronRight className='shrink-0 group-data-open:rotate-90 group-data-open:duration-750 group-data-closed:duration-375 ease-mocca' />
      </Trigger>
    </AccordionHeader>
  )
}

const AccordionContent: React.FC<
  React.ComponentPropsWithoutRef<typeof Content>
> = ({className, ...props}) => {
  return (
    <Content
      className={cn(
        'overflow-hidden group-data-open:animate-accordion-open group-data-closed:animate-accordion-close',
        className
      )}
      {...props}
    />
  )
}

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
