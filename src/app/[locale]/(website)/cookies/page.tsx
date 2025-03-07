import * as React from 'react'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {useTranslations} from 'next-intl'
import {Container} from '@/src/components/shared/container'
import {Typography} from '@/src/components/ui/typography'

export async function generateMetadata({params}: Params) {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'Metadata.Pages'})

  return {
    title: `${t('cookies')} | Mocca Living`
  }
}

export default function CookiesPage({params}: Params) {
  const {locale} = React.use(params)

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
