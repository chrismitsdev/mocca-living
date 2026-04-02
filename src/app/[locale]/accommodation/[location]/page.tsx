import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import type {Locale} from 'next-intl'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {use} from 'react'

type Params = {
  params: Promise<{
    locale: Locale
    location: PropertyLocation
  }>
}

export async function generateMetadata({params}: Params): Promise<Metadata> {
  const {locale, location} = await params
  const t = await getTranslations({locale, namespace: 'Metadata'})
  const unknownLocation = location !== 'mocca-sea' && location !== 'mocca-city'

  return {
    title: t(
      unknownLocation ? 'not_found' : `accommodation.location.${location}.title`
    )
  }
}

export default function AccomodationLocationPage({params}: Params) {
  const {locale, location} = use(params as Params['params'])
  const unknownLocation = location !== 'mocca-sea' && location !== 'mocca-city'

  setRequestLocale(locale)

  if (unknownLocation) {
    notFound()
  }

  return (
    <div>
      <h1>{location}</h1>
    </div>
  )
}

export function generateStaticParams() {
  return [{location: 'mocca-sea'}, {location: 'mocca-city'}]
}
