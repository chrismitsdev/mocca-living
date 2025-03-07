'use client'

import * as React from 'react'
import {MinimizeIcon} from 'lucide-react'
import {cn} from '@/src/lib/utils'
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogContent,
  DialogTitle,
  DialogClose
} from '@/src/components/ui/dialog'
import {AudioPlayer} from '@/src/components/ui/audio-player'
import {VisuallyHidden} from '@/src/components/ui/visually-hidden'
import {Button} from '@/src/components/ui/button'

const DialogAudioPlayer: React.FC<React.PropsWithChildren> = ({children}) => {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      modal={false}
    >
      <DialogTrigger>{children}</DialogTrigger>
      <DialogPortal forceMount>
        <DialogContent
          className={cn(
            'p-0 w-[calc(100%-16px)] max-w-3xl',
            !open && 'invisible'
          )}
          aria-describedby={undefined}
        >
          <VisuallyHidden>
            <DialogTitle>{'Mocca Living audio playlist 2024'}</DialogTitle>
          </VisuallyHidden>
          <AudioPlayer />
          <DialogClose asChild>
            <Button
              aria-label='Close dialog'
              className='absolute top-3 right-3 group'
              variant='ghost-error'
              size='icon-normal'
            >
              <MinimizeIcon className='group-hover:scale-90' />
            </Button>
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

DialogAudioPlayer.displayName = 'DialogAudioPlayer'

export {DialogAudioPlayer}
