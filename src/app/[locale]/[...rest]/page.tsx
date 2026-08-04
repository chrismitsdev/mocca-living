import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {getTranslations} from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata')

  return {
    title: t('not_found')
  }
}

export default function CatchAllPage() {
  notFound()
}
