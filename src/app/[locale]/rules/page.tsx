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
    title: `${t('rules')} | Mocca Living`
  }
}

export default function RulesPage({params}: Params) {
  const {locale} = React.use(params)

  setRequestLocale(locale)

  const t = useTranslations('Pages.Rules')

  return (
    <Section>
      <Container className='space-y-12'>
        <article className='space-y-4'>
          <Typography variant='h4'>{t('item-1.title')}</Typography>
          <Typography>{t('item-1.description')}</Typography>
        </article>
        <article className='space-y-4'>
          <Typography variant='h4'>{t('item-2.title')}</Typography>
          <Typography>{t('item-2.description')}</Typography>
        </article>
      </Container>
    </Section>
  )
}
