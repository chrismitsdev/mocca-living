import {useTranslations} from 'next-intl'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {Typography} from '@/src/components/ui/typography'

function AccommodationIntro() {
  const t = useTranslations('Pages.Accommodation.Index.Intro')

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
        <Typography>{t('message')}</Typography>
      </Section>
    </Container>
  )
}

AccommodationIntro.displayName = 'AccommodationIntro'

export {AccommodationIntro}
