import {notFound} from 'next/navigation'
import {getTranslations} from 'next-intl/server'

export async function generateMetadata({params: {locale}}: Params) {
  const t = await getTranslations({locale, namespace: 'Metadata'})

  return {
    title: t('Pages.notFound')
  }
}
 
export default function NotFoundPage() {
  notFound()
}