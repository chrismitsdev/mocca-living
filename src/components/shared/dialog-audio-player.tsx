'use client'

import * as React from 'react'
import {MinimizeIcon} from 'lucide-react'
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogContent,
  DialogTitle,
  DialogOverlay,
  DialogClose
} from '@/components/ui/dialog'
import {AudioPlayer} from '@/components/ui/audio-player'
import {VisuallyHidden} from '@/components/ui/visually-hidden'
import {Button} from '@/components/ui/button'
import {playlist} from '#/public/music/playlist'

function DialogAudioPlayer({children}: {children: React.ReactNode}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog
      modal={false}
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger>{children}</DialogTrigger>
      <DialogPortal forceMount>
        <DialogOverlay />
        <DialogContent
          className='p-0 w-[calc(100%-32px)] sm:w-full sm:max-w-3xl'
          hidden={!open}
          forceMount
        >
          <VisuallyHidden>
            <DialogTitle>{'Mocca Living audio playlist 2024'}</DialogTitle>
          </VisuallyHidden>
          <AudioPlayer playlist={playlist} />
          <DialogClose
            className='absolute top-3 right-3'
            asChild
          >
            <Button
              className='group'
              size='icon-small'
              variant='ghost-error'
            >
              <MinimizeIcon className='group-hover:scale-75' />
            </Button>
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

DialogAudioPlayer.displayName = 'DialogAudioPlayer'

export {DialogAudioPlayer}
