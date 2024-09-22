import {getTranslations} from 'next-intl/server'
import {useTranslations} from 'next-intl'
import {unstable_setRequestLocale} from 'next-intl/server'
import {Container} from '@/components/shared/container'
import {Typography} from '@/components/ui/typography'

export async function generateMetadata({params: {locale}}: Params) {
  const t = await getTranslations({locale, namespace: 'Metadata.Pages'})

  return {
    title: `${t('privacy')} | Mocca Living`
  }
}

export default function PrivacyPage({params: {locale}}: Params) {
  unstable_setRequestLocale(locale)
  const t = useTranslations('Pages.Privacy')

  return (
    <Container className='pt-56 space-y-12'>
      <article className='space-y-4'>
        <Typography variant='h4'>{t('title')}</Typography>
        <Typography>{t('content')}</Typography>
      </article>
      <article className='space-y-4'>
        <Typography variant='h4'>{t('sub-title')}</Typography>
        <Typography>{t('sub-content')}</Typography>
      </article>
    </Container>
  )
}
