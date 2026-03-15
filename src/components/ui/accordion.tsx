'use client'

import {Content, Header, Item, Root, Trigger} from '@radix-ui/react-accordion'
import {ChevronRight} from 'lucide-react'
import {cn} from '@/src/lib/utils'

const Accordion = Root

function AccordionItem({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Item>) {
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

function AccordionHeader({
  asChild = true,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Header>) {
  return (
    <Header
      asChild={asChild}
      {...props}
    >
      <h6>{children}</h6>
    </Header>
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<typeof Trigger>) {
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

function AccordionContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Content>) {
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
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger
}
