import {useTranslations} from 'next-intl'
import {VisuallyHidden} from '@/src/components/ui/visually-hidden'

const AccommodationHeader: React.FC = () => {
  const t = useTranslations('Metadata.Pages')

  return (
    <VisuallyHidden>
      <h1>{t('accommodation.root')}</h1>
    </VisuallyHidden>
  )
}

AccommodationHeader.displayName = 'AccommodationHeader'

export {AccommodationHeader}
