import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import type {Locale} from 'next-intl'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import * as React from 'react'
import {SlugCarousel} from '@/src/app/[locale]/accommodation/[slug]/(components)/slug-carousel'
import {SlugDetails} from '@/src/app/[locale]/accommodation/[slug]/(components)/slug-details'
import {SlugHeader} from '@/src/app/[locale]/accommodation/[slug]/(components)/slug-header'

type ParamsWithSlug = {
  params: Promise<{
    locale: Locale
    slug: Slug
  }>
}

export async function generateMetadata({
  params
}: ParamsWithSlug): Promise<Metadata> {
  const {locale, slug} = await params

  if (slug !== 'dimitra' && slug !== 'georgia') {
    return {
      title: 'Mocca Living'
    }
  }

  const t = await getTranslations({
    locale,
    namespace: 'Metadata.Pages.accommodation'
  })

  return {
    title: `${t(slug)} | Mocca Living`
  }
}

export function generateStaticParams() {
  return [{slug: 'georgia'}, {slug: 'dimitra'}]
}

export default function SlugPage({
  params
}: PageProps<'/[locale]/accommodation/[slug]'>) {
  const {locale, slug} = React.use(params as ParamsWithSlug['params'])

  setRequestLocale(locale)

  if (slug !== 'georgia' && slug !== 'dimitra') {
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
