import {useTranslations} from 'next-intl'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {Typography} from '@/src/components/ui/typography'

function PrivacyContent() {
  const t = useTranslations('Pages.privacy')

  return (
    <Section>
      <Container className='space-y-12'>
        <article className='space-y-4'>
          <Typography
            variant='h4'
            asChild
          >
            <h2>{t('terms.title')}</h2>
          </Typography>
          <Typography>{t('terms.description')}</Typography>
        </article>
        <article className='space-y-4'>
          <Typography
            variant='h4'
            asChild
          >
            <h2>{t('agreement.title')}</h2>
          </Typography>
          <Typography>{t('agreement.description')}</Typography>
        </article>
      </Container>
    </Section>
  )
}

PrivacyContent.displayName = 'PrivacyContent'

export {PrivacyContent}
