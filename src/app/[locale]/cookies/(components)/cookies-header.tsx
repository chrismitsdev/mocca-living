import {useTranslations} from 'next-intl'
import {VisuallyHidden} from '@/src/components/ui/visually-hidden'

const CookiesHeader: React.FC = () => {
  const t = useTranslations('Metadata.Pages')

  return (
    <VisuallyHidden>
      <h1>{t('cookies')}</h1>
    </VisuallyHidden>
  )
}

CookiesHeader.displayName = 'CookiesHeader'

export {CookiesHeader}
