import {useTranslations} from 'next-intl'

function SlugHeader({slug}: {slug: Slug}) {
  const t = useTranslations('Metadata.Pages.accommodation')

  return <h1 className='sr-only'>{t(slug)}</h1>
}

SlugHeader.displayName = 'SlugHeader'

export {SlugHeader}
