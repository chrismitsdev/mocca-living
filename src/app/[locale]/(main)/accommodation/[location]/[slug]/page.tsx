import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {getLocale, getTranslations} from 'next-intl/server'
import {buildAlternates, isValidLocation} from '@/src/lib/utils'
import {Details} from './(components)/details'
import {Distances} from './(components)/distances'
import {SlugHeader} from './(components)/header'
import {HeroCarousel} from './(components)/hero-carousel'

type Params = {
  params: Promise<{
    location: PropertyLocation
    slug: PropertySlug
  }>
}

const slugsByLocation: Record<PropertyLocation, PropertySlug[]> = {
  'mocca-sea': ['sea-georgia', 'sea-dimitra'],
  'mocca-city': ['city-dimitra']
}

export async function generateMetadata({params}: Params): Promise<Metadata> {
  const {location, slug} = await params
  const locale = await getLocale()
  const t = await getTranslations('Metadata')
  const valid =
    isValidLocation(location) && slugsByLocation[location].includes(slug)

  return {
    title: t(valid ? `accommodation.slug.${slug}.title` : 'not_found'),
    ...(valid && {
      alternates: buildAlternates(`/accommodation/${location}/${slug}`, locale)
    })
  }
}

export default async function AccomodationSlugPage({
  params
}: PageProps<'/[locale]/accommodation/[location]/[slug]'>) {
  const {location, slug} = await (params as Params['params'])
  const valid =
    isValidLocation(location) && slugsByLocation[location].includes(slug)

  if (!valid) {
    notFound()
  }

  return (
    <>
      <SlugHeader slug={slug} />
      <HeroCarousel slug={slug} />
      <Details slug={slug} />
      <Distances location={location} />
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
