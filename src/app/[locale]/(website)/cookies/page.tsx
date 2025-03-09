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
    <Container className='pt-56 space-y-12'>
      <article className='space-y-4'>
        <Typography variant='h4'>{t('title-1')}</Typography>
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
        <Typography variant='h4'>{t('title-2')}</Typography>
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
  )
}
