import {useTranslations} from 'next-intl'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {Typography} from '@/src/components/ui/typography'

function Intro() {
  const t = useTranslations('Pages.experience.intro')

  return (
    <Container
      className='space-y-6'
      asChild
    >
      <Section>
        <Typography
          variant='h2'
          asChild
        >
          <h2>{t('title')}</h2>
        </Typography>
        <Typography>
          {t.rich('message', {
            br: () => <br />,
            strong: (text) => <span className='font-bold'>{text}</span>
          })}
        </Typography>
      </Section>
    </Container>
  )
}

Intro.displayName = 'Intro'

export {Intro}
