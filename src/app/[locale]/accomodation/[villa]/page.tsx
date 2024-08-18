import {getTranslations} from 'next-intl/server'
import {useTranslations} from 'next-intl'
import {notFound} from 'next/navigation'
import {unstable_setRequestLocale} from 'next-intl/server'
import {Container} from '@/components/shared/container'

type ParamsWithSlug<T extends Params = Params> = {
  [K in keyof T]: T[K] & {
    villa: Exclude<keyof IntlMessages['Metadata']['Pages']['accomodation'], 'root'>
  }
}

export function generateStaticParams() {
  return [{villa: 'georgia'}, {villa: 'dimitra'}]
}

export async function generateMetadata({params: {locale, villa}}: ParamsWithSlug) {
  const t = await getTranslations({locale, namespace: 'Metadata.Pages'})

  return {
    title: `${t(`accomodation.${villa}`)} | Mocca Living`
  }
}

export default function VillaPage({params: {locale, villa}}: ParamsWithSlug) {
  unstable_setRequestLocale(locale)
  const t = useTranslations(`Pages.Accomodation`)

  if (villa !== 'dimitra' && villa !== 'georgia') {
    notFound()
  }

  return (
    <Container className='pt-56'>
      <span>
        {'This is the page for villa:'} <strong>{villa}</strong>
      </span>
    </Container>
  )
}
