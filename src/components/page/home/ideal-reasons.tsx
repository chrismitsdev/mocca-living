import {useTranslations} from 'next-intl'
import {CornerDownRightIcon} from 'lucide-react'
import {Container} from '@/components/shared/container'
import {CustomImage} from '@/components/ui/custom-image'
import {Typography} from '@/components/ui/typography'
import {FadeUp} from '@/components/motion/fade-up'
import * as outdoorImages from '#/public/images/outdoor'

function IdealReasons() {
  const t = useTranslations('Pages.Home.IdealReasons')

  return (
    <article className='py-24 space-y-6 bg-surface-2'>
      <Container>
        <div className='grid gap-16 sm:grid-cols-2'>
          <div className='sm:hidden'>
            <CustomImage
              className='h-full object-cover rounded shadow'
              src={outdoorImages.OutdoorImage5}
              alt='Hello'
            />
          </div>
          <div className='hidden grid-cols-2 grid-rows-2 gap-2 sm:grid'>
            <div className='col-start-2'>
              <CustomImage
                className='h-full object-cover rounded shadow'
                src={outdoorImages.OutdoorImage5}
                alt='Hello'
              />
            </div>
            <div className='row-start-2'>
              <CustomImage
                className='h-full object-cover rounded shadow'
                src={outdoorImages.OutdoorImage11}
                alt='Hello'
              />
            </div>
          </div>
          <div>
            <Typography
              variant='h3'
              className='pb-3'
            >
              {t('title')}
            </Typography>
            <div className='mt-12 space-y-14'>
              <FadeUp>
                <Reason
                  title={t('reasons.reason1.title')}
                  description={t('reasons.reason1.description')}
                />
              </FadeUp>
              <FadeUp>
                <Reason
                  title={t('reasons.reason2.title')}
                  description={t('reasons.reason2.description')}
                />
              </FadeUp>
              <FadeUp>
                <Reason
                  title={t('reasons.reason3.title')}
                  description={t('reasons.reason3.description')}
                />
              </FadeUp>
              <FadeUp>
                <Reason
                  title={t('reasons.reason4.title')}
                  description={t('reasons.reason4.description')}
                />
              </FadeUp>
              <FadeUp>
                <Reason
                  title={t('reasons.reason5.title')}
                  description={t('reasons.reason5.description')}
                />
              </FadeUp>
            </div>
          </div>
        </div>
      </Container>
    </article>
  )
}

function Reason({title, description}: {title: string; description: string}) {
  return (
    <div className='flex gap-2'>
      <CornerDownRightIcon
        className='shrink-0'
        size={24}
      />
      <div className='space-y-2'>
        <Typography variant='large'>{title}</Typography>
        <Typography>{description}</Typography>
      </div>
    </div>
  )
}

IdealReasons.displayName = 'IdealReasons'
Reason.displayName = 'Reason'

export {IdealReasons}
