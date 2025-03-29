import {notFound} from 'next/navigation'
import {getTranslations} from 'next-intl/server'

export async function generateMetadata({params}: Params) {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'Metadata.Pages'})

  return {
    title: `${t('not-found')} | Mocca Living`
  }
}

export default function CatchAllPage() {
  notFound()
}
