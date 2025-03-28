import {useTranslations} from 'next-intl'
import {Section} from '@/src/components/shared/section'
import {Container} from '@/src/components/shared/container'
import {Typography} from '@/src/components/ui/typography'

const PrivacyContent: React.FC = () => {
  const t = useTranslations('Pages.Privacy')

  return (
    <Section>
      <Container className='space-y-12'>
        <article className='space-y-4'>
          <Typography
            variant='h4'
            asChild
          >
            <h2>{t('title')}</h2>
          </Typography>
          <Typography>{t('content')}</Typography>
        </article>
        <article className='space-y-4'>
          <Typography
            variant='h4'
            asChild
          >
            <h2>{t('sub-title')}</h2>
          </Typography>
          <Typography>{t('sub-content')}</Typography>
        </article>
      </Container>
    </Section>
  )
}

PrivacyContent.displayName = 'PrivacyContent'

export {PrivacyContent}
