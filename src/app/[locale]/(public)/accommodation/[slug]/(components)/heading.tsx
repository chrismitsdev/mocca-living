import {useTranslations} from 'next-intl'

function Heading({slug}: {slug: PropertySlug}) {
  const t = useTranslations('Metadata.accommodation.slug')
  return <h1 className='sr-only'>{t(`${slug}.title`)}</h1>
}

export {Heading}
