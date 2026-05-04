import {useTranslations} from 'next-intl'

function RulesHeader() {
  const t = useTranslations('Metadata')

  return <h1 className='sr-only'>{t('rules')}</h1>
}

RulesHeader.displayName = 'RulesHeader'

export {RulesHeader}
