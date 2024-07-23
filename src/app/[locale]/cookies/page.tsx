import {getTranslations} from 'next-intl/server'
import {useTranslations} from 'next-intl'
import {unstable_setRequestLocale} from 'next-intl/server'
import {Container} from '@/components/shared/container'
import {Article} from '@/components/shared/article'
import {Typography} from '@/components/ui/typography'

export async function generateMetadata({params: {locale}}: Params) {
  const t = await getTranslations({locale, namespace: 'Metadata'})
 
  return {
    title: `${t('Pages.cookies')} | Mocca Living`
  }
}

export default function IndexPage({params: {locale}}: Params) {
  unstable_setRequestLocale(locale)
  const t = useTranslations('Pages.Cookies')

  return (
    <Container asChild>
      <section>
        <Article>
          <Typography variant='h4'>{t('title')}</Typography>
          <Typography>{t('content')}</Typography>
        </Article>
      </section>
    </Container>
  )
}
