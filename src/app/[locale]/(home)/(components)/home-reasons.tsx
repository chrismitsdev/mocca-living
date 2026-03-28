import {useTranslations} from 'next-intl'
import {dimitraCover, georgiaCover} from '@/public/images/covers'
import {homeReasonsImages} from '@/public/images/home/home-reasons'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {CustomImage} from '@/src/components/ui/custom-image'
import {
  Scrollarea,
  ScrollareaBar,
  ScrollareaViewport
} from '@/src/components/ui/scrollarea'
import {Typography} from '@/src/components/ui/typography'

function HomeReasons() {
  const t = useTranslations('Pages.Home.IdealReasons')

  return (
    <Section className='bg-surface-2 space-y-4'>
      <Scrollarea className='sm:hidden'>
        <ScrollareaViewport>
          <div className='px-3 inline-max grid grid-flow-col gap-x-3'>
            <CustomImage
              className='aspect-3/4 block-96'
              src={dimitraCover}
              alt='Dimitra villa'
            />
            <CustomImage
              className='aspect-3/4 block-96'
              src={homeReasonsImages[0]}
              alt='Handmade ceramic cups and a bowl on a dark round table'
            />
            <CustomImage
              className='aspect-3/4 block-96'
              src={homeReasonsImages[1]}
              alt='Handmade ceramic cups arranged on a wooden shelf'
            />
            <CustomImage
              className='aspect-3/4 block-96'
              src={georgiaCover}
              alt='Georgia villa'
            />
          </div>
        </ScrollareaViewport>
        <ScrollareaBar
          className='invisible'
          orientation='horizontal'
        />
      </Scrollarea>
      <Container>
        <div className='space-y-12'>
          <Typography
            variant='h3'
            asChild
          >
            <h2>{t('title')}</h2>
          </Typography>
          <div className='space-y-10'>
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
      </Container>
    </Section>
  )
}

function Reason({title, description}: {title: string; description: string}) {
  return (
    <div className='space-y-1'>
      <Typography variant='large'>{title}</Typography>
      <Typography>{description}</Typography>
    </div>
  )
}

HomeReasons.displayName = 'HomeReasons'
Reason.displayName = 'Reason'

export {HomeReasons}
