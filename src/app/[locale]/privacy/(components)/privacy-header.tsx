import {useTranslations} from 'next-intl'

function PrivacyHeader() {
  const t = useTranslations('Metadata')

  return <h1 className='sr-only'>{t('privacy')}</h1>
}

PrivacyHeader.displayName = 'PrivacyHeader'

export {PrivacyHeader}
