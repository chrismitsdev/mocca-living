import {notFound} from 'next/navigation'
import {getTranslations} from 'next-intl/server'

export async function generateMetadata({params: {locale}}: Params) {
  const t = await getTranslations({locale, namespace: 'Metadata'})

  return {
    title: t('Pages.not-found')
  }
}

export default function CatchAllPage() {
  notFound()
}
