import {IconMusic} from '@tabler/icons-react'
import {AudioPlayer} from '@/src/components/ui/audio-player'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@/src/components/ui/dialog'
import {IconButton} from '@/src/components/ui/icon-button'

function AudioDialog() {
  return (
    <Dialog>
      <DialogTrigger
        className='fixed inset-be-3 inset-e-3'
        asChild
      >
        <IconButton aria-label='Open music player'>
          <IconMusic />
        </IconButton>
      </DialogTrigger>
      <DialogContent>
        <DialogClose className='absolute inset-e-4 inset-bs-4' />
        <DialogTitle className='sr-only'>Mocca Living audio player</DialogTitle>
        <AudioPlayer />
      </DialogContent>
    </Dialog>
  )
}

export {AudioDialog}
