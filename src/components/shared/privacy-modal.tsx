import {useTranslations} from 'next-intl'
import {XIcon} from 'lucide-react'
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogClose
} from '@/src/components/ui/dialog'
import {Separator} from '@/src/components/ui/separator'
import {
  ScrollArea,
  ScrollAreaViewport,
  ScrollAreaBar
} from '@/src/components/ui/scrollarea'
import {Typography} from '@/src/components/ui/typography'
import {VisuallyHidden} from '@/src/components/ui/visually-hidden'
import {Button} from '@/src/components/ui/button'

const PrivacyModal: React.FC<React.PropsWithChildren> = ({children}) => {
  const m = useTranslations('Metadata.Pages')
  const p = useTranslations('Pages.Privacy')

  return (
    <Dialog>
      <DialogTrigger className='underline font-bold text-brand-10'>
        {children}
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent className='p-0 w-[calc(100%-32px)] h-[calc(100svh-32px)] sm:h-auto sm:w-full sm:max-w-3xl'>
          <DialogTitle className='p-4'>{m('privacy')}</DialogTitle>
          <Separator />
          <ScrollArea
            type='always'
            className='h-[calc(100%-61px)]'
          >
            <ScrollAreaViewport>
              <div className='p-4 space-y-6'>
                <article className='space-y-1.5'>
                  <Typography variant='h5'>{p('title')}</Typography>
                  <Typography className='text-sm sm:text-base'>
                    {p('content')}
                  </Typography>
                </article>
                <article className='space-y-1.5'>
                  <Typography variant='h5'>{p('sub-title')}</Typography>
                  <Typography className='text-sm sm:text-base'>
                    {p('sub-content')}
                  </Typography>
                </article>
              </div>
            </ScrollAreaViewport>
            <ScrollAreaBar />
          </ScrollArea>
          <DialogClose asChild>
            <Button
              className='absolute top-3 right-3'
              variant='ghost-error'
              size='icon-small'
            >
              <VisuallyHidden>{'Close modal'}</VisuallyHidden>
              <XIcon />
            </Button>
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

PrivacyModal.displayName = 'PrivacyModal'

export {PrivacyModal}
