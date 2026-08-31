import {useTranslations} from 'next-intl'
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTrigger
} from '@/src/components/ui/dialog'
import {Typography} from '@/src/components/ui/typography'

function PrivacyPolicyDialog({children}: React.PropsWithChildren) {
  const t = useTranslations()

  return (
    <Dialog>
      <DialogTrigger className='underline focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-2'>
        {children}
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>{t('Metadata.privacy')}</DialogHeader>
          <DialogBody className='space-y-4'>
            <Typography variant='large'>
              {t('Pages.privacy.terms.title')}
            </Typography>
            <Typography>{t('Pages.privacy.terms.description')}</Typography>
            <Typography variant='large'>
              {t('Pages.privacy.agreement.title')}
            </Typography>
            <Typography>{t('Pages.privacy.agreement.description')}</Typography>
          </DialogBody>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

PrivacyPolicyDialog.displayName = 'PrivacyPolicyDialog'

export {PrivacyPolicyDialog}
