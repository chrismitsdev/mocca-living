import {useTranslations} from 'next-intl'
import {CornerDownRightIcon} from 'lucide-react'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {CustomImage} from '@/src/components/ui/custom-image'
import {Typography} from '@/src/components/ui/typography'
import {reasonImage1, reasonImage2} from '@/public/images/home/home-reasons'

const HomeReasons: React.FC = () => {
  const t = useTranslations('Pages.Home.IdealReasons')

  return (
    <Section className='bg-surface-2'>
      <Container>
        <div className='grid gap-16 sm:grid-cols-2'>
          <div className='sm:hidden'>
            <CustomImage
              className='h-full object-cover rounded shadow-small'
              src={reasonImage1}
              alt='Hello'
            />
          </div>
          <div className='hidden grid-cols-3 grid-rows-2 gap-5 sm:grid'>
            <div className='col-start-2 col-span-2'>
              <CustomImage
                className='h-full object-cover rounded shadow-small'
                src={reasonImage1}
                alt='Hello'
              />
            </div>
            <div className='row-start-2 col-span-2'>
              <CustomImage
                className='h-full object-cover rounded shadow-small'
                src={reasonImage2}
                alt='Hello'
              />
            </div>
          </div>
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

const Reason: React.FC<{title: string; description: string}> = ({
  title,
  description
}) => {
  return (
    <div className='flex gap-2'>
      <CornerDownRightIcon
        className='shrink-0'
        size={24}
      />
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
