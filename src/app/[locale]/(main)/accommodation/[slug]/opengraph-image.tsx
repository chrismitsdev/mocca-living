import type {Locale} from 'next-intl'
import {getTranslations} from 'next-intl/server'
import {getOpengraphImage} from '@/src/lib/get-opengraph-image'

type ParamsWithSlug = {
  params: Promise<{
    locale: Locale
    slug: PropertySlug
  }>
}

export const alt = 'Accommodation page'
export const size = {width: 1200, height: 630}
export const contentType = 'image/png'

export default async function Image({params}: ParamsWithSlug) {
  const {locale, slug} = await params
  const t = await getTranslations({locale, namespace: 'Metadata'})
  return getOpengraphImage(t(`accommodation.slug.${slug}.title`), alt, size)
}
