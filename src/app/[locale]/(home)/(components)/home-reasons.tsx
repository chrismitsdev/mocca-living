import {ArrowBigRightIcon} from 'lucide-react'
import {useTranslations} from 'next-intl'
import {dimitraCover, georgiaCover} from '@/public/images/covers'
import {reasonImage1, reasonImage2} from '@/public/images/home/home-reasons'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {CustomImage} from '@/src/components/ui/custom-image'
import {Typography} from '@/src/components/ui/typography'

function HomeReasons() {
  const t = useTranslations('Pages.Home.IdealReasons')

  return (
    <Section className='bg-surface-2'>
      <Container>
        <div className='grid gap-16 xl:grid-cols-2'>
          <div className='sm:hidden'>
            <CustomImage
              className='h-full object-cover rounded shadow-small'
              src={reasonImage1}
              alt='Handmade ceramic cups and a bowl displayed on a dark round table'
              sizes='calc(100vw - 32px)'
            />
          </div>
          <div className='hidden grid-cols-2 grid-rows-2 gap-5 sm:grid'>
            <CustomImage
              className='object-cover rounded shadow-small self-end'
              src={dimitraCover}
              alt='Dimitra villa'
              sizes='(min-width: 1024px) 490px, (min-width: 768px) 362px, (min-width: 640px) 298px, 100vw'
            />
            <CustomImage
              className='h-full object-cover rounded shadow-small'
              src={reasonImage1}
              alt='Handmade ceramic cups and a bowl displayed on a dark round table'
              sizes='(min-width: 1024px) 490px, (min-width: 768px) 362px, (min-width: 640px) 298px, 100vw'
            />
            <CustomImage
              className='h-full object-cover rounded shadow-small'
              src={reasonImage2}
              alt='Handmade ceramic cups arranged on a wooden shelf'
              sizes='(min-width: 1024px) 490px, (min-width: 768px) 362px, (min-width: 640px) 298px, 100vw'
            />
            <CustomImage
              className='object-cover rounded shadow-small self-start'
              src={georgiaCover}
              alt='Georgia villa'
              sizes='(min-width: 1024px) 490px, (min-width: 768px) 362px, (min-width: 640px) 298px, 100vw'
            />
          </div>
          {/*<div className='hidden grid-cols-2 grid-rows-2 gap-5 sm:grid'>
            <div className='col-start-2'>
              <CustomImage
                className='h-full object-cover rounded shadow-small'
                src={reasonImage1}
                alt='Handmade ceramic cups and a bowl displayed on a dark round table'
                sizes='(min-width: 640px) 476px'
              />
            </div>
            <div className='row-start-2'>
              <CustomImage
                className='h-full object-cover rounded shadow-small'
                src={reasonImage2}
                alt='Handmade ceramic cups arranged on a wooden shelf'
                sizes='(min-width: 640px) 476px'
              />
            </div>
          </div>*/}
          <div>
            <Typography
              variant='h3'
              asChild
            >
              <h2>{t('title')}</h2>
            </Typography>
            <div className='mt-12 space-y-14'>
              <Reason
                title={t('reasons.reason1.title')}
                description={t('reasons.reason1.description')}
              />
              <Reason
                title={t('reasons.reason2.title')}
                description={t('reasons.reason2.description')}
              />
              <Reason
                title={t('reasons.reason3.title')}
                description={t('reasons.reason3.description')}
              />
              <Reason
                title={t('reasons.reason4.title')}
                description={t('reasons.reason4.description')}
              />
              <Reason
                title={t('reasons.reason5.title')}
                description={t('reasons.reason5.description')}
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

function Reason({title, description}: {title: string; description: string}) {
  return (
    <div className='flex gap-2'>
      <ArrowBigRightIcon className='shrink-0' />
      <div className='space-y-2'>
        <Typography variant='large'>{title}</Typography>
        <Typography className='leading-8'>{description}</Typography>
      </div>
    </div>
  )
}

HomeReasons.displayName = 'HomeReasons'
Reason.displayName = 'Reason'

export {HomeReasons}
