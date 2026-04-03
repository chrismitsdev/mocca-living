import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import type {Locale} from 'next-intl'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {isValidLocation} from '@/src/lib/utils'
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

const slugsByLocation: Record<PropertyLocation, PropertySlug[]> = {
  'mocca-sea': ['sea-georgia', 'sea-dimitra'],
  'mocca-city': ['city-dimitra']
}

export async function generateMetadata({params}: Params): Promise<Metadata> {
  const {locale, location, slug} = await params
  const t = await getTranslations({locale, namespace: 'Metadata'})
  const valid =
    isValidLocation(location) && slugsByLocation[location].includes(slug)

  return {
    title: t(valid ? `accommodation.slug.${slug}.title` : 'not_found')
  }
}

export default async function AccomodationSlugPage({
  params
}: PageProps<'/[locale]/accommodation/[location]/[slug]'>) {
  const {locale, location, slug} = await (params as Params['params'])
  const valid =
    isValidLocation(location) && slugsByLocation[location].includes(slug)

  setRequestLocale(locale)

  if (!valid) {
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

export function generateStaticParams(): {
  location: PropertyLocation
  slug: PropertySlug
}[] {
  return [
    {location: 'mocca-sea', slug: 'sea-dimitra'},
    {location: 'mocca-sea', slug: 'sea-georgia'},
    {location: 'mocca-city', slug: 'city-dimitra'}
  ]
}
