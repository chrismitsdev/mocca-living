import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import type {Locale} from 'next-intl'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {isValidLocation} from '@/src/lib/utils'

type Params = {
  params: Promise<{
    locale: Locale
    location: PropertyLocation
  }>
}

export async function generateMetadata({params}: Params): Promise<Metadata> {
  const {locale, location} = await params
  const t = await getTranslations({locale, namespace: 'Metadata'})
  const validLocation = isValidLocation(location)

  return {
    title: t(
      validLocation ? `accommodation.location.${location}.title` : 'not_found'
    )
  }
}

export default async function AccomodationLocationPage({params}: Params) {
  const {locale, location} = await (params as Params['params'])
  const validLocation = isValidLocation(location)

  setRequestLocale(locale)

  if (!validLocation) {
    notFound()
  }

  return null
}

export function generateStaticParams(): {location: PropertyLocation}[] {
  return [{location: 'mocca-sea'}, {location: 'mocca-city'}]
}
