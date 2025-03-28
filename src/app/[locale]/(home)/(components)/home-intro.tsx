import {useTranslations} from 'next-intl'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {Typography} from '@/src/components/ui/typography'

const HomeIntro: React.FC = () => {
  const t = useTranslations('Pages.Home.Introdution')

  return (
    <Container
      className='space-y-6'
      asChild
    >
      <Section>
        <Typography
          variant='h3'
          asChild
        >
          <h2>{t('title')}</h2>
        </Typography>
        <Typography className='leading-8'>{t('message')}</Typography>
      </Section>
    </Container>
  )
}

HomeIntro.displayName = 'HomeIntro'

export {HomeIntro}
