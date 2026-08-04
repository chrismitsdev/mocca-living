import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {getTranslations} from 'next-intl/server'
import {isValidLocation} from '@/src/lib/utils'

type Params = {
  params: Promise<{
    location: PropertyLocation
  }>
}

export async function generateMetadata({params}: Params): Promise<Metadata> {
  const {location} = await params
  const t = await getTranslations('Metadata')
  const validLocation = isValidLocation(location)

  return {
    title: t(
      validLocation ? `accommodation.location.${location}.title` : 'not_found'
    )
  }
}

export default async function AccomodationLocationPage({
  params
}: PageProps<'/[locale]/accommodation/[location]'>) {
  const {location} = await (params as Params['params'])
  const validLocation = isValidLocation(location)

  if (!validLocation) {
    notFound()
  }

  return null
}

export function generateStaticParams(): {location: PropertyLocation}[] {
  return [{location: 'mocca-sea'}, {location: 'mocca-city'}]
}
