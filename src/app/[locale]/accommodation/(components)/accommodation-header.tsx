import {useTranslations} from 'next-intl'

function AccommodationHeader() {
  const t = useTranslations('Metadata')

  return <h1 className='sr-only'>{t('accommodation.title')}</h1>
}

AccommodationHeader.displayName = 'AccommodationHeader'

export {AccommodationHeader}
