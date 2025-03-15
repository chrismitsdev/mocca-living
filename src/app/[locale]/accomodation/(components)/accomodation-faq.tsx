import * as React from 'react'
import {useTranslations} from 'next-intl'
import {MapPinnedIcon, BanIcon} from 'lucide-react'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
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
    <Section>
      <Container className='space-y-6'>
        <Typography variant='h3'>{t('title')}</Typography>
        <Accordion
          className='flex flex-col gap-4'
          type='multiple'
        >
          <AccordionItem value='item-1'>
            <AccordionTrigger>
              <div className='flex items-center gap-2 grow'>
                <MapPinnedIcon />
                <Typography variant='h4'>{t('accordion-1.title')}</Typography>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className='px-4 py-3 space-y-6'>
                <li className='space-y-1'>
                  <Typography variant='h5'>
                    {t('accordion-1.item-1.title')}
                  </Typography>
                  <Typography>{t('accordion-1.item-1.content')}</Typography>
                </li>
                <li className='space-y-1'>
                  <Typography variant='h5'>
                    {t('accordion-1.item-2.title')}
                  </Typography>
                  <Typography>{t('accordion-1.item-2.content')}</Typography>
                </li>
                <li className='space-y-1'>
                  <Typography variant='h5'>
                    {t('accordion-1.item-3.title')}
                  </Typography>
                  <Typography>{t('accordion-1.item-3.content')}</Typography>
                </li>
                <li className='space-y-1'>
                  <Typography variant='h5'>
                    {t('accordion-1.item-4.title')}
                  </Typography>
                  <Typography>{t('accordion-1.item-4.content')}</Typography>
                </li>
                <li className='space-y-1'>
                  <Typography variant='h5'>
                    {t('accordion-1.item-5.title')}
                  </Typography>
                  <Typography>{t('accordion-1.item-5.content')}</Typography>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-2'>
            <AccordionTrigger>
              <div className='flex items-center gap-2 grow'>
                <BanIcon />
                <Typography variant='h4'>{t('accordion-2.title')}</Typography>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className='px-4 py-3 space-y-6'>
                <li className='space-y-1'>
                  <Typography variant='h5'>
                    {t('accordion-2.item-1.title')}
                  </Typography>
                  <Typography>{t('accordion-2.item-1.content')}</Typography>
                </li>
                <li className='space-y-1'>
                  <Typography variant='h5'>
                    {t('accordion-2.item-2.title')}
                  </Typography>
                  <Typography>{t('accordion-2.item-2.content')}</Typography>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Container>
    </Section>
  )
}

AccomodationFaq.displayName = 'AccomodationFaq'

export {AccomodationFaq}
