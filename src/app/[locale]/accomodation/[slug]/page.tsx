import * as React from 'react'
import {Locale} from 'next-intl'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {notFound} from 'next/navigation'
import {SlugCarousel} from '@/src/app/[locale]/accomodation/[slug]/(components)/slug-carousel'
import {SlugDetails} from '@/src/app/[locale]/accomodation/[slug]/(components)/slug-details'

type ParamsWithSlug = {
  params: Promise<{
    locale: Locale
    slug: Slug
  }>
}

export async function generateMetadata({params}: ParamsWithSlug) {
  const {locale, slug} = await params

  const t = await getTranslations({
    locale,
    namespace: 'Metadata.Pages.accomodation'
  })

  return {
    title: `${t(slug)} | Mocca Living`
  }
}

export function generateStaticParams() {
  return [{slug: 'georgia'}, {slug: 'dimitra'}]
}

export default function SlugPage({params}: ParamsWithSlug) {
  const {locale, slug} = React.use(params)

  setRequestLocale(locale)

  if (slug !== 'georgia' && slug !== 'dimitra') {
    notFound()
  }

  return (
    <>
      <SlugCarousel slug={slug} />
      <SlugDetails slug={slug} />
    </>
  )
}
