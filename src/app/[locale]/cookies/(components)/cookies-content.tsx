import {useTranslations} from 'next-intl'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {Typography} from '@/src/components/ui/typography'

const CookiesContent: React.FC = () => {
  const t = useTranslations('Pages.Cookies')

  return (
    <Section>
      <Container className='space-y-12'>
        <article className='space-y-4'>
          <Typography
            variant='h4'
            asChild
          >
            <h2>{t('title-1')}</h2>
          </Typography>
          <Typography>{t('content-1.description')}</Typography>
          <ul className='space-y-1'>
            <Typography asChild>
              <li>
                {t.rich('content-1.bullet-1', {
                  strong: (chunks) => (
                    <span className='font-medium'>{chunks}</span>
                  )
                })}
              </li>
            </Typography>
            <Typography asChild>
              <li>
                {t.rich('content-1.bullet-2', {
                  strong: (chunks) => (
                    <span className='font-medium'>{chunks}</span>
                  )
                })}
              </li>
            </Typography>
            <Typography asChild>
              <li>
                {t.rich('content-1.bullet-3', {
                  strong: (chunks) => (
                    <span className='font-medium'>{chunks}</span>
                  )
                })}
              </li>
            </Typography>
            <Typography asChild>
              <li>
                {t.rich('content-1.bullet-4', {
                  strong: (chunks) => (
                    <span className='font-medium'>{chunks}</span>
                  )
                })}
              </li>
            </Typography>
          </ul>
        </article>
        <article className='space-y-4'>
          <Typography
            variant='h4'
            asChild
          >
            <h2>{t('title-2')}</h2>
          </Typography>
          <Typography>{t('content-2.description')}</Typography>
          <ul className='space-y-1'>
            <Typography asChild>
              <li>
                {t.rich('content-2.bullet-1', {
                  strong: (chunks) => (
                    <span className='font-medium'>{chunks}</span>
                  )
                })}
              </li>
            </Typography>
            <Typography asChild>
              <li>
                {t.rich('content-2.bullet-2', {
                  strong: (chunks) => (
                    <span className='font-medium'>{chunks}</span>
                  )
                })}
              </li>
            </Typography>
          </ul>
        </article>
      </Container>
    </Section>
  )
}

CookiesContent.displayName = 'CookiesContent'

export {CookiesContent}
