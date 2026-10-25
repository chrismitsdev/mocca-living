import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {getTranslations} from 'next-intl/server'
import {IS_PRODUCTION} from '@/src/lib/constants'
import {Heading} from './(components)/heading'

type SlugParams = Promise<{
  slug: PropertySlug
}>

export async function generateMetadata({
  params
}: {
  params: SlugParams
}): Promise<Metadata> {
  const {slug} = await params
  const t = await getTranslations('Metadata')

  return {
    title: t(`guest-app.${slug}`)
  }
}

export default async function GuestAppSlugPage({
  params
}: PageProps<'/[locale]/guest-app/[slug]'>) {
  // Guest app is a work in progress, keep it unreachable in production
  if (IS_PRODUCTION) notFound()

  const {slug} = await (params as SlugParams)

  return (
    <>
      <Heading slug={slug} />
      <p>You are in {slug} page</p>
    </>
  )
}
