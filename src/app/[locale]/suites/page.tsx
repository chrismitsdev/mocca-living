import {getTranslations} from 'next-intl/server'
import {useTranslations} from 'next-intl'
import {unstable_setRequestLocale} from 'next-intl/server'
import {Container} from '@/components/shared/container'

export async function generateMetadata({params: {locale}}: Params) {
  const t = await getTranslations({locale, namespace: 'Metadata'})
 
  return {
    title: `${t('Pages.suites')} | Mocca Living`
  }
}

export default function SuitesPage({params: {locale}}: Params) {
  unstable_setRequestLocale(locale)
  const t = useTranslations('Pages.Suites')

  return (
    <Container asChild>
      <section>
        
      </section>
    </Container>
  )
}