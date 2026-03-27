import {useTranslations} from 'next-intl'
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger
} from '@/src/components/ui/dialog'
import {
  Scrollarea,
  ScrollareaBar,
  ScrollareaViewport
} from '@/src/components/ui/scrollarea'
import {Separator} from '@/src/components/ui/separator'
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
          <DialogClose />
          <DialogHeader className='pb-6'>
            <DialogTitle>{t('Metadata.Pages.privacy')}</DialogTitle>
          </DialogHeader>
          <Separator />
          <Scrollarea
            className='block-[calc(100%-77px)]'
            type='always'
          >
            <ScrollareaViewport>
              <DialogBody className='space-y-4'>
                <Typography variant='large'>
                  {t('Pages.Privacy.title')}
                </Typography>
                <Typography>{t('Pages.Privacy.content')}</Typography>
                <Separator />
                <Typography variant='large'>
                  {t('Pages.Privacy.sub-title')}
                </Typography>
                <Typography>{t('Pages.Privacy.sub-content')}</Typography>
              </DialogBody>
            </ScrollareaViewport>
            <ScrollareaBar />
          </Scrollarea>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

PrivacyPolicyDialog.displayName = 'PrivacyPolicyDialog'

export {PrivacyPolicyDialog}
