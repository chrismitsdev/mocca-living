import * as React from 'react'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {useTranslations} from 'next-intl'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {Typography} from '@/src/components/ui/typography'

export async function generateMetadata({params}: Params) {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'Metadata.Pages'})

  return {
    title: `${t('privacy')} | Mocca Living`
  }
}

export default function PrivacyPage({params}: Params) {
  const {locale} = React.use(params)

  setRequestLocale(locale)

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
