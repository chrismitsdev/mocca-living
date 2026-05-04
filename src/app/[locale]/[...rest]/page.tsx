import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {getTranslations} from 'next-intl/server'

export async function generateMetadata({params}: Params): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'Metadata'})

  return {
    title: t('not_found')
  }
}

export default function CatchAllPage() {
  notFound()
}
