import {useTranslations} from 'next-intl'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {Typography} from '@/src/components/ui/typography'

const AccomodationIntro: React.FC = () => {
  const t = useTranslations('Pages.Accomodation.Index.Intro')

  return (
    <Container
      className='space-y-6'
      asChild
    >
      <Section>
        <Typography variant='h3'>{t('title')}</Typography>
        <Typography className='leading-8'>{t('message')}</Typography>
      </Section>
    </Container>
  )
}

AccomodationIntro.displayName = 'AccomodationIntro'

export {AccomodationIntro}
