import {getTranslations} from 'next-intl/server'
import {notFound} from 'next/navigation'
import {unstable_setRequestLocale} from 'next-intl/server'
import {SlugCarousel} from '@/components/page/accomodation/slug/slug-carousel'
import {SlugDetails} from '@/components/page/accomodation/slug/slug-details'

type ParamsWithSlug<T extends Params = Params> = {
  [K in keyof T]: T[K] & {
    slug: Slug
  }
}

export function generateStaticParams() {
  return [{slug: 'georgia'}, {slug: 'dimitra'}]
}

export async function generateMetadata({
  params: {locale, slug}
}: ParamsWithSlug) {
  const t = await getTranslations({locale, namespace: 'Metadata.Pages'})

  return {
    title: `${t(`accomodation.${slug}`)} | Mocca Living`
  }
}

export default async function SlugPage({
  params: {locale, slug}
}: ParamsWithSlug) {
  unstable_setRequestLocale(locale)

  if (slug !== 'georgia' && slug !== 'dimitra') {
    notFound()
  }

  return (
    <>
      <SlugCarousel slug={slug} />
      <SlugDetails
        slug={slug}
        locale={locale}
      />
    </>
  )
}
