import {getTranslations} from 'next-intl/server'
import {useTranslations} from 'next-intl'
import {unstable_setRequestLocale} from 'next-intl/server'
import {Container} from '@/components/shared/container'
import {HomeCarousel} from '@/components/page/home/HomeCarousel'
import {Label} from '@/components/ui/label'
import {Input} from '@/components/ui/input'

export async function generateMetadata({params: {locale}}: Params) {
  const t = await getTranslations({locale, namespace: 'Metadata'})
 
  return {
    title: `${t('Pages.home')} | Mocca Living`
  }
}

export default function IndexPage({params: {locale}}: Params) {
  unstable_setRequestLocale(locale)
  const t = useTranslations('Pages.Home')

  return (
    <Container>
      {/* <HomeCarousel /> */}
      <div>
        <Label htmlFor='label'>{'Label'}</Label>
        <Input id='label' placeholder='Placeholder text' />
      </div>
    </Container>
  )
}
