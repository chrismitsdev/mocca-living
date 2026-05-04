'use client'

import {useState} from 'react'
import {AudioPlayer} from '@/src/components/ui/audio-player'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogPortal,
  DialogTitle,
  DialogTrigger
} from '@/src/components/ui/dialog'
import {cn} from '@/src/lib/utils'

function DialogAudioPlayer({children}: React.PropsWithChildren) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      modal={false}
    >
      <DialogTrigger className='focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-2'>
        {children}
      </DialogTrigger>
      <DialogPortal forceMount>
        <DialogContent
          className={cn(
            'not-sm:block-auto sm:max-inline-xl',
            !open && 'invisible'
          )}
        >
          <DialogClose />
          <DialogTitle className='sr-only'>
            Mocca Living audio playlist 2024
          </DialogTitle>
          <AudioPlayer />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

DialogAudioPlayer.displayName = 'DialogAudioPlayer'

export {DialogAudioPlayer}
