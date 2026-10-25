import {useTranslations} from 'next-intl'
import {Section} from '@/src/components/shared/section'
import {Typography} from '@/src/components/ui/typography'

function Intro() {
  const t = useTranslations('Pages.accommodation.index.intro')

  return (
    <Section>
      <Typography
        variant='h3'
        asChild
      >
        <h2>{t('title')}</h2>
      </Typography>
      <Typography>{t('message')}</Typography>
    </Section>
  )
}

export {Intro}
