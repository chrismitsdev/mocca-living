import {useTranslations} from 'next-intl'
import {VisuallyHidden} from '@/src/components/ui/visually-hidden'

function SlugHeader({slug}: {slug: Slug}) {
  const t = useTranslations('Metadata.Pages.accommodation')

  return (
    <VisuallyHidden>
      <h1>{t(slug)}</h1>
    </VisuallyHidden>
  )
}

SlugHeader.displayName = 'SlugHeader'

export {SlugHeader}
