import {useTranslations} from 'next-intl'
import {VisuallyHidden} from '@/src/components/ui/visually-hidden'

function ContactHeader() {
  const t = useTranslations('Metadata.Pages')

  return (
    <VisuallyHidden>
      <h1>{t('contact')}</h1>
    </VisuallyHidden>
  )
}

ContactHeader.displayName = 'ContactHeader'

export {ContactHeader}
