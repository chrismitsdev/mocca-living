import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import type {Locale} from 'next-intl'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {use} from 'react'
import {SlugCarousel} from './(components)/slug-carousel'
import {SlugDetails} from './(components)/slug-details'
import {SlugHeader} from './(components)/slug-header'

type Params = {
  params: Promise<{
    locale: Locale
    location: PropertyLocation
    slug: PropertySlug
  }>
}

export async function generateMetadata({params}: Params): Promise<Metadata> {
  const {locale, slug} = await params
  const t = await getTranslations({locale, namespace: 'Metadata'})
  const unknownSlug =
    slug !== 'sea-dimitra' && slug !== 'sea-georgia' && slug !== 'city-georgia'

  return {
    title: t(unknownSlug ? 'not_found' : `accommodation.slug.${slug}.title`)
  }
}

export default function AccomodationSlugPage({
  params
}: PageProps<'/[locale]/accommodation/[location]/[slug]'>) {
  const {locale, slug} = use(params as Params['params'])
  const unknownSlug =
    slug !== 'sea-dimitra' && slug !== 'sea-georgia' && slug !== 'city-georgia'

  setRequestLocale(locale)

  if (unknownSlug) {
    notFound()
  }

  return (
    <>
      <SlugHeader slug={slug} />
      <SlugCarousel slug={slug} />
      <SlugDetails slug={slug} />
    </>
  )
}

export function generateStaticParams() {
  return [
    {location: 'mocca-sea', slug: 'sea-dimitra'},
    {location: 'mocca-sea', slug: 'sea-georgia'},
    {location: 'mocca-city', slug: 'city-georgia'}
  ]
}
