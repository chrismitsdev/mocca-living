import {useTranslations} from 'next-intl'
import {Container} from '@/components/shared/container'
import {Typography} from '@/components/ui/typography'

function Introduction() {
  const t = useTranslations('Pages.Accomodation.Index.Introdution')

  return (
    <Container
      className='space-y-6'
      asChild
    >
      <article>
        <Typography variant='h3'>{t('title')}</Typography>
        <Typography className='leading-8'>{t('message')}</Typography>
      </article>
    </Container>
  )
}

Introduction.displayName = 'Introduction'

export {Introduction}
