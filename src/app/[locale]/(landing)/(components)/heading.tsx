import {useTranslations} from 'next-intl'

function Heading() {
  const t = useTranslations('Metadata')
  return <h1 className='sr-only'>{t('home')}</h1>
}

export {Heading}
