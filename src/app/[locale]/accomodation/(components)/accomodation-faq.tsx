import * as React from 'react'
import {useTranslations} from 'next-intl'
import {Container} from '@/src/components/shared/container'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/src/components/ui/accordion'
import {Typography} from '@/src/components/ui/typography'

const AccomodationFaq: React.FC = () => {
  const t = useTranslations('Pages.Accomodation.Index.Faq')

  return (
    <Container asChild>
      <section className='space-y-6'>
        <Typography variant='h3'>Frequently asked questions</Typography>
        <Accordion
          className='flex flex-col gap-4'
          type='multiple'
        >
          <AccordionItem value='item-1'>
            <AccordionTrigger>Accordion Trigger 1</AccordionTrigger>
            <AccordionContent>
              <div className='px-4 py-3'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
                officia autem fugit explicabo temporibus molestiae veniam iure
                cupiditate nulla, laboriosam maiores libero, beatae quaerat.
                Nihil veniam architecto molestias nulla fugit totam! Inventore
                sit sed, eligendi molestias et consectetur reiciendis, fuga
                laudantium aspernatur eius nulla dolorem vel obcaecati! Velit,
                sint nisi.
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-2'>
            <AccordionTrigger>Accordion Trigger 2</AccordionTrigger>
            <AccordionContent>
              <div className='px-4 py-3'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
                officia autem fugit explicabo temporibus molestiae veniam iure
                cupiditate nulla, laboriosam maiores libero, beatae quaerat.
                Nihil veniam architecto molestias nulla fugit totam! Inventore
                sit sed, eligendi molestias et consectetur reiciendis, fuga
                laudantium aspernatur eius nulla dolorem vel obcaecati! Velit,
                sint nisi.
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-3'>
            <AccordionTrigger>Accordion Trigger 3</AccordionTrigger>
            <AccordionContent>
              <div className='px-4 py-3'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
                officia autem fugit explicabo temporibus molestiae veniam iure
                cupiditate nulla, laboriosam maiores libero, beatae quaerat.
                Nihil veniam architecto molestias nulla fugit totam! Inventore
                sit sed, eligendi molestias et consectetur reiciendis, fuga
                laudantium aspernatur eius nulla dolorem vel obcaecati! Velit,
                sint nisi.
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </Container>
  )
}

AccomodationFaq.displayName = 'AccomodationFaq'

export {AccomodationFaq}
