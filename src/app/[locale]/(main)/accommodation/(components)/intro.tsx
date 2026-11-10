import {useTranslations} from 'next-intl'
import {Section} from '@/src/components/shared/section'
import {Typography} from '@/src/components/ui/typography'

function Intro() {
  const t = useTranslations('Pages.accommodation.index.intro')

  return (
    <Section>
      <Typography
        variant='h3'
        as='h2'
      >
        {t('title')}
      </Typography>
      <Typography>{t('message')}</Typography>
    </Section>
  )
}

export {Intro}
