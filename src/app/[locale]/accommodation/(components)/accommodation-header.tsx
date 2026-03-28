import {useTranslations} from 'next-intl'

function AccommodationHeader() {
  const t = useTranslations('Metadata.Pages')

  return <h1 className='sr-only'>{t('accommodation.index')}</h1>
}

AccommodationHeader.displayName = 'AccommodationHeader'

export {AccommodationHeader}
