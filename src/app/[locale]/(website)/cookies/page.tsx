import {getTranslations, setRequestLocale} from 'next-intl/server'
import {useTranslations} from 'next-intl'
import {Container} from '@/components/shared/container'
import {Typography} from '@/components/ui/typography'

export async function generateMetadata({params: {locale}}: Params) {
  const t = await getTranslations({locale, namespace: 'Metadata.Pages'})

  return {
    title: `${t('cookies')} | Mocca Living`
  }
}

export default function CookiesPage({params: {locale}}: Params) {
  setRequestLocale(locale)
  const t = useTranslations('Pages.Cookies')

  return (
    <Container className='pt-56'>
      <article className='space-y-4'>
        <Typography variant='h4'>{t('title')}</Typography>
        <Typography>{t('content')}</Typography>
      </article>
    </Container>
  )
}
