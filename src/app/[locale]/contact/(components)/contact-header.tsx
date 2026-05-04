import {useTranslations} from 'next-intl'

function ContactHeader() {
  const t = useTranslations('Metadata')

  return <h1 className='sr-only'>{t('contact')}</h1>
}

ContactHeader.displayName = 'ContactHeader'

export {ContactHeader}
