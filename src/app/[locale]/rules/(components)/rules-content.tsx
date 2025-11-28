import {useTranslations} from 'next-intl'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {Typography} from '@/src/components/ui/typography'

const RulesContent: React.FC = () => {
  const t = useTranslations('Pages.Rules')

  return (
    <Section>
      <Container className='space-y-12'>
        <article className='space-y-4'>
          <Typography
            variant='h4'
            asChild
          >
            <h2>{t('item-1.title')}</h2>
          </Typography>
          <Typography>{t('item-1.description')}</Typography>
        </article>
        <article className='space-y-4'>
          <Typography
            variant='h4'
            asChild
          >
            <h2>{t('item-2.title')}</h2>
          </Typography>
          <Typography>{t('item-2.description')}</Typography>
        </article>
        <article className='space-y-4'>
          <Typography
            variant='h4'
            asChild
          >
            <h2>{t('item-3.title')}</h2>
          </Typography>
          <Typography>{t('item-3.description')}</Typography>
        </article>
      </Container>
    </Section>
  )
}

RulesContent.displayName = 'RulesContent'

export {RulesContent}
