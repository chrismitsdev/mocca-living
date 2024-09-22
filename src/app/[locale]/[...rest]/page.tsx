import {notFound} from 'next/navigation'
import {getTranslations} from 'next-intl/server'

export async function generateMetadata({params: {locale}}: Params) {
  const t = await getTranslations({locale, namespace: 'Metadata.Pages'})

  return {
    title: t('not-found')
  }
}

export default function CatchAllPage() {
  notFound()
}
