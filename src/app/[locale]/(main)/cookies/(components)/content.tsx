import {useTranslations} from 'next-intl'
import {Section} from '@/src/components/shared/section'
import {Typography} from '@/src/components/ui/typography'

function Content() {
  const t = useTranslations('Pages.cookies')

  return (
    <Section>
      <div className='space-y-16'>
        <article className='space-y-4'>
          <Typography
            variant='h4'
            as='h2'
          >
            {t('title-1')}
          </Typography>
          <Typography>{t('content-1.description')}</Typography>
          <ul className='space-y-1'>
            <li>
              <Typography>
                {t.rich('content-1.bullet-1', {
                  strong: (chunks) => (
                    <span className='font-medium'>{chunks}</span>
                  )
                })}
              </Typography>
            </li>
            <li>
              <Typography>
                {t.rich('content-1.bullet-2', {
                  strong: (chunks) => (
                    <span className='font-medium'>{chunks}</span>
                  )
                })}
              </Typography>
            </li>
            <li>
              <Typography>
                {t.rich('content-1.bullet-3', {
                  strong: (chunks) => (
                    <span className='font-medium'>{chunks}</span>
                  )
                })}
              </Typography>
            </li>
            <li>
              <Typography>
                {t.rich('content-1.bullet-4', {
                  strong: (chunks) => (
                    <span className='font-medium'>{chunks}</span>
                  )
                })}
              </Typography>
            </li>
          </ul>
        </article>
        <article className='space-y-4'>
          <Typography
            variant='h4'
            as='h2'
          >
            {t('title-2')}
          </Typography>
          <Typography>{t('content-2.description')}</Typography>
          <ul className='space-y-1'>
            <li>
              <Typography>
                {t.rich('content-2.bullet-1', {
                  strong: (chunks) => (
                    <span className='font-medium'>{chunks}</span>
                  )
                })}
              </Typography>
            </li>
          </ul>
        </article>
      </div>
    </Section>
  )
}

export {Content}
