import {useTranslations} from 'next-intl'
import {unstable_setRequestLocale} from 'next-intl/server'
import {Container} from '@/components/shared/container'

export default function IndexPage({params: {locale}}: Params) {
  unstable_setRequestLocale(locale)
  const t = useTranslations('Pages')

  return (
    <Container asChild>
      <section>
        {t('Home.placeholder')}
      </section>
    </Container>
  )
}
