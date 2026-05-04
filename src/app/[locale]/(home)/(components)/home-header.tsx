import {useTranslations} from 'next-intl'

function HomeHeader() {
  const t = useTranslations('Metadata')

  return <h1 className='sr-only'>{t('home')}</h1>
}

HomeHeader.displayName = 'HomeHeader'

export {HomeHeader}
