'use client'

import {IconMusic} from '@tabler/icons-react'
import {AudioPlayer} from '@/src/components/ui/audio-player'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger
} from '@/src/components/ui/dialog'
import {IconButton} from '@/src/components/ui/icon-button'

function DialogAudioPlayer() {
  return (
    <Dialog>
      <DialogTrigger
        className='fixed inset-be-3 inset-e-3 sm:hidden'
        asChild
      >
        <IconButton aria-label='Open music playlist'>
          <IconMusic />
        </IconButton>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent className='block-auto'>
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
