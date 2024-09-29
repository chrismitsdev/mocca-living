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
                {
                  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi officia autem fugit explicabo temporibus molestiae veniam iure cupiditate nulla, laboriosam maiores libero, beatae quaerat. Nihil veniam architecto molestias nulla fugit totam! Inventore sit sed, eligendi molestias et consectetur reiciendis, fuga laudantium aspernatur eius nulla dolorem vel obcaecati! Velit, sint nisi.'
                }
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-2'>
            <AccordionTrigger>{'Accordion Trigger 2'}</AccordionTrigger>
            <AccordionContent>
              <div className='px-4 py-3'>
                {
                  'Lorem ipsum dolor sit amet consectetur adipisicing elit. In nam ab laborum error ea rem nihil sint, nisi voluptates nesciunt deleniti exercitationem non corporis cum modi ipsam. Quis enim consequuntur repellat blanditiis tenetur delectus eveniet porro placeat a expedita aliquam quod maxime quisquam repudiandae nihil deleniti, ratione cupiditate dolorem perspiciatis.'
                }
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-3'>
            <AccordionTrigger>{'Accordion Trigger 3'}</AccordionTrigger>
            <AccordionContent>
              <div className='px-4 py-3'>
                {
                  'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus amet ipsum omnis expedita distinctio, odit soluta sunt sed, labore incidunt optio consequatur quibusdam, exercitationem libero enim! Unde id consectetur placeat molestiae voluptate. Accusantium esse ab vel magni distinctio quasi, a, culpa ipsam amet itaque, quaerat ratione. Consequatur veritatis rem debitis?'
                }
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
