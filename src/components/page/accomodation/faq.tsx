import * as React from 'react'
import {Container} from '@/components/shared/container'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/ui/accordion'
import {Typography} from '@/components/ui/typography'

function Faq() {
  return (
    <Container asChild>
      <article className='space-y-6'>
        <Typography variant='h3'>{'Frequently asked questions'}</Typography>
        <Accordion
          className='flex flex-col gap-4'
          type='multiple'
        >
          <AccordionItem value='item-1'>
            <AccordionTrigger>{'Accordion Trigger 1'}</AccordionTrigger>
            <AccordionContent>
              <div className='px-4 py-3'>
                {'This is the content for accordion trigger 1'}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-2'>
            <AccordionTrigger>{'Accordion Trigger 2'}</AccordionTrigger>
            <AccordionContent>
              <div className='px-4 py-3'>
                {'This is the content for accordion trigger 2'}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-3'>
            <AccordionTrigger>{'Accordion Trigger 3'}</AccordionTrigger>
            <AccordionContent>
              <div className='px-4 py-3'>
                {'This is the content for accordion trigger 3'}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </article>
    </Container>
  )
}

Faq.displayName = 'Faq'

export {Faq}
