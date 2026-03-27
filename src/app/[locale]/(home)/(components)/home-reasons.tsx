import {useTranslations} from 'next-intl'
import {dimitraCover, georgiaCover} from '@/public/images/covers'
import {homeReasonsImages} from '@/public/images/home/home-reasons'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {CustomImage} from '@/src/components/ui/custom-image'
import {Typography} from '@/src/components/ui/typography'

function HomeReasons() {
  const t = useTranslations('Pages.Home.IdealReasons')

  return (
    <Section className='bg-surface-2'>
      <Container>
        <div className='grid gap-16 sm:grid-cols-2'>
          <div className='grid grid-cols-2 gap-4'>
            <CustomImage
              className='h-auto self-end'
              src={dimitraCover}
              alt='Dimitra villa'
            />
            <CustomImage
              src={homeReasonsImages[0]}
              alt='Handmade ceramic cups and a bowl on a dark round table'
            />
            <CustomImage
              src={homeReasonsImages[1]}
              alt='Handmade ceramic cups arranged on a wooden shelf'
            />
            <CustomImage
              className='h-auto self-start'
              src={georgiaCover}
              alt='Georgia villa'
            />
          </div>
          <div className='space-y-12'>
            <Typography
              variant='h3'
              asChild
            >
              <h2>{t('title')}</h2>
            </Typography>
            <div className='space-y-14'>
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
    <div className='space-y-2'>
      <Typography variant='large'>{title}</Typography>
      <Typography>{description}</Typography>
    </div>
  )
}

HomeReasons.displayName = 'HomeReasons'
Reason.displayName = 'Reason'

export {HomeReasons}
