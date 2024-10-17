import {useTranslations} from 'next-intl'
import {Container} from '@/components/shared/container'
import {Typography} from '@/components/ui/typography'
import {FadeUp} from '@/components/motion/fade-up'

function Introduction() {
  const t = useTranslations('Pages.Accomodation.Index.Introdution')

  return (
    <FadeUp>
      <Container
        className='space-y-6'
        asChild
      >
        <article>
          <Typography variant='h3'>{t('title')}</Typography>
          <Typography className='leading-8'>{t('message')}</Typography>
        </article>
      </Container>
    </FadeUp>
  )
}

Introduction.displayName = 'Introduction'

export {Introduction}
