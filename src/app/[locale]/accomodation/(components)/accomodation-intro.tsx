import {useTranslations} from 'next-intl'
import {Container} from '@/src/components/shared/container'
import {Typography} from '@/src/components/ui/typography'

const AccomodationIntro: React.FC = () => {
  const t = useTranslations('Pages.Accomodation.Index.Introdution')

  return (
    <Container
      className='space-y-6'
      asChild
    >
      <section>
        <Typography variant='h3'>{t('title')}</Typography>
        <Typography className='leading-8'>{t('message')}</Typography>
      </section>
    </Container>
  )
}

AccomodationIntro.displayName = 'AccomodationIntro'

export {AccomodationIntro}
