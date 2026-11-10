import {useTranslations} from 'next-intl'
import {Section} from '@/src/components/shared/section'
import {Typography} from '@/src/components/ui/typography'

function Content() {
  const t = useTranslations('Pages.rules')

  return (
    <Section>
      <div className='space-y-16'>
        <article className='space-y-4'>
          <Typography
            variant='h4'
            as='h2'
          >
            {t('item-1.title')}
          </Typography>
          <Typography>{t('item-1.description')}</Typography>
        </article>
        <article className='space-y-4'>
          <Typography
            variant='h4'
            as='h2'
          >
            {t('item-2.title')}
          </Typography>
          <Typography>{t('item-2.description')}</Typography>
        </article>
        <article className='space-y-4'>
          <Typography
            variant='h4'
            as='h2'
          >
            {t('item-3.title')}
          </Typography>
          <Typography>{t('item-3.description')}</Typography>
        </article>
      </div>
    </Section>
  )
}

export {Content}
