import {useTranslations} from 'next-intl'

function Header() {
  const t = useTranslations('Metadata')

  return <h1 className='sr-only'>{t('rules')}</h1>
}

Header.displayName = 'Header'

export {Header}
