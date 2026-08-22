import {useTranslations} from 'next-intl'

function SlugHeader({slug}: {slug: PropertySlug}) {
  const t = useTranslations('Metadata.accommodation.slug')

  return <h1 className='sr-only'>{t(`${slug}.title`)}</h1>
}

SlugHeader.displayName = 'SlugHeader'

export {SlugHeader}
