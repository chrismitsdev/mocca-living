import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import type {Locale} from 'next-intl'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {use} from 'react'
import {SlugCarousel} from './(components)/slug-carousel'
import {SlugDetails} from './(components)/slug-details'
import {SlugHeader} from './(components)/slug-header'

type ParamsWithSlug = {
  params: Promise<{
    locale: Locale
    slug: Slug
  }>
}

export async function generateMetadata({
  params
}: ParamsWithSlug): Promise<Metadata | undefined> {
  const {locale, slug} = await params
  const t = await getTranslations({locale, namespace: 'Metadata.Pages'})
  const unknownSlug = slug !== 'dimitra' && slug !== 'georgia'

  return {
    title: t(unknownSlug ? 'not-found' : `accommodation.${slug}`)
  }
}

export function generateStaticParams() {
  return [{slug: 'georgia'}, {slug: 'dimitra'}]
}

export default function SlugPage({
  params
}: PageProps<'/[locale]/accommodation/[slug]'>) {
  const {locale, slug} = use(params as ParamsWithSlug['params'])
  const unknownSlug = slug !== 'dimitra' && slug !== 'georgia'

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
