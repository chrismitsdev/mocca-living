import {useTranslations} from 'next-intl'
import {VisuallyHidden} from '@/src/components/ui/visually-hidden'

const RulesHeader: React.FC = () => {
  const t = useTranslations('Metadata.Pages')

  return (
    <VisuallyHidden>
      <h1>{t('rules')}</h1>
    </VisuallyHidden>
  )
}

RulesHeader.displayName = 'RulesHeader'

export {RulesHeader}
