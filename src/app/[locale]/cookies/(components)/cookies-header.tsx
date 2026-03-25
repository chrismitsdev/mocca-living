import {useTranslations} from 'next-intl'

function CookiesHeader() {
  const t = useTranslations('Metadata.Pages')

  return <h1 className='sr-only'>{t('cookies')}</h1>
}

CookiesHeader.displayName = 'CookiesHeader'

export {CookiesHeader}
