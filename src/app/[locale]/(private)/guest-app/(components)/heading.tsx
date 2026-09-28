import {useTranslations} from 'next-intl'

function Heading() {
  const t = useTranslations('Metadata')
  return <h1>{t('guest-app')}</h1>
}

export {Heading}
