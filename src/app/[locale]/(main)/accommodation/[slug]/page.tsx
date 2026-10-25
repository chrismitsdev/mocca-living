import type {Metadata} from 'next'
import type {Locale} from 'next-intl'
import {getTranslations} from 'next-intl/server'
import {Metadata as TranslationsMetadata} from '@/messages/en.json'
import {getAlternates} from '@/src/lib/get-alternates'
import {Details} from './(components)/details'
import {Distances} from './(components)/distances'
import {Heading} from './(components)/heading'
import {HeroCarousel} from './(components)/hero-carousel'

type Params = {
  params: Promise<{
    locale: Locale
    slug: PropertySlug
  }>
}

export async function generateMetadata({params}: Params): Promise<Metadata> {
  const {slug} = await params
  const t = await getTranslations('Metadata')

  return {
    title: t(`accommodation.slug.${slug}.title`),
    alternates: await getAlternates(`/accommodation/${slug}`)
  }
}

export default async function AccomodationSlugPage({
  params
}: PageProps<'/[locale]/accommodation/[slug]'>) {
  const {slug} = await (params as Params['params'])

  return (
    <>
      <Heading slug={slug} />
      <HeroCarousel slug={slug} />
      <Details slug={slug} />
      <Distances slug={slug} />
    </>
  )
}

export function generateStaticParams() {
  return Object.keys(TranslationsMetadata.accommodation.slug).map((slug) => ({
    slug
  }))
}
