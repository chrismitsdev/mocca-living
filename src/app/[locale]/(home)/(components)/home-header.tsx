import {useTranslations} from 'next-intl'
import {VisuallyHidden} from '@/src/components/ui/visually-hidden'

const HomeHeader: React.FC = () => {
  const t = useTranslations('Metadata.Pages')

  return (
    <VisuallyHidden>
      <h1>{t('home')}</h1>
    </VisuallyHidden>
  )
}

HomeHeader.displayName = 'HomeHeader'

export {HomeHeader}
