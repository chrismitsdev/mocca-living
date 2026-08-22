import {useTranslations} from 'next-intl'

function Header() {
  const t = useTranslations('Metadata')

  return <h1 className='sr-only'>{t('accommodation.title')}</h1>
}

Header.displayName = 'Header'

export {Header}
