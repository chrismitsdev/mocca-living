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

function FormDialog({children}: React.PropsWithChildren) {
  const t = useTranslations()

  return (
    <Dialog open>
      <DialogTrigger className='underline font-bold text-brand-10'>
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
            // className='h-96'
            className='h-[calc(100%-76px)]'
            type='always'
          >
            <ScrollareaViewport>
              <DialogBody>
                <Typography variant='large'>
                  {t('Pages.Privacy.title')}
                </Typography>
                <Typography>{t('Pages.Privacy.content')}</Typography>
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

FormDialog.displayName = 'FormDialog'

export {FormDialog}
