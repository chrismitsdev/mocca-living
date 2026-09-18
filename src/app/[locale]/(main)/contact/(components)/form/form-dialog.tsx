import {useTranslations} from 'next-intl'
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/src/components/ui/dialog'
import {Typography} from '@/src/components/ui/typography'

function FormDialog({children}: React.PropsWithChildren) {
  const t = useTranslations()

  return (
    <Dialog>
      <DialogTrigger className='underline focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-2'>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('Metadata.privacy')}</DialogTitle>
          <DialogClose />
        </DialogHeader>
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
    </Dialog>
  )
}

export {FormDialog}
