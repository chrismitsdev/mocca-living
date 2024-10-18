'use client'

import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import {MinimizeIcon} from 'lucide-react'
import {cn} from '#/lib/utils'
import {playlist} from '#/public/music/playlist'
import {AudioPlayer} from '@/components/ui/audio-player'
import {VisuallyHidden} from '@/components/ui/visually-hidden'
import {Button} from '@/components/ui/button'

function DialogAudioPlayerRe({children}: {children: React.ReactNode}) {
  const [open, setOpen] = React.useState(false)

  // return (
  //   <Dialog.Root
  //     open={open}
  //     onOpenChange={setOpen}
  //   >
  //     <Dialog.Trigger>{children}</Dialog.Trigger>
  //     <Dialog.Portal>
  //       <Dialog.Overlay className='fixed z-[1] inset-0 bg-black/50 data-open:animate-in data-open:fade-in data-open:backdrop-blur-[1px] data-open:duration-750 data-closed:animate-out data-closed:fade-out data-closed:backdrop-blur-none data-closed:duration-500 ease-mocca' />
  //       <Dialog.Content
  //         aria-describedby={undefined}
  //         className='fixed z-[1] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full max-w-3xl bg-surface-2 rounded shadow-medium data-open:animate-in data-open:fade-in data-open:slide-in-from-bottom-[calc(32px-50%)] data-open:slide-in-from-left-[50%] data-open:duration-750 data-closed:animate-out data-closed:fade-out data-closed:slide-out-to-bottom-[calc(32px-50%)] data-closed:slide-out-to-left-[50%] data-closed:duration-500 ease-mocca'
  //       >
  //         <VisuallyHidden>
  //           <Dialog.Title>{'Mocca Living audio playlist 2024'}</Dialog.Title>
  //         </VisuallyHidden>
  //         <AudioPlayer playlist={playlist} />
  //         <Dialog.Close asChild>
  //           <Button
  //             aria-label='Close dialog'
  //             className='absolute top-3 right-3'
  //             variant='ghost-error'
  //             size='icon-normal'
  //           >
  //             <MinimizeIcon />
  //           </Button>
  //         </Dialog.Close>
  //       </Dialog.Content>
  //     </Dialog.Portal>
  //   </Dialog.Root>
  // )
  return (
    <Dialog.Root
      modal={false}
      open={open}
      onOpenChange={setOpen}
    >
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Portal forceMount>
        {/* <Dialog.Overlay className='fixed z-[1] inset-0 bg-black/50 data-open:animate-in data-open:fade-in data-open:backdrop-blur-[1px] data-open:duration-750 data-closed:animate-out data-closed:fade-out data-closed:backdrop-blur-none data-closed:duration-500 ease-mocca' /> */}
        <Dialog.Content
          forceMount
          aria-describedby={undefined}
          className={cn(
            'fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[calc(100%-32px)] bg-surface-2 rounded shadow-medium data-open:animate-in data-open:fade-in data-open:slide-in-from-bottom-[calc(32px-50%)] data-open:slide-in-from-left-[50%] data-open:duration-750 data-closed:animate-out data-closed:fade-out data-closed:slide-out-to-bottom-[calc(32px-50%)] data-closed:slide-out-to-left-[50%] data-closed:duration-500 ease-mocca sm:w-full sm:max-w-3xl',
            !open && 'invisible [content-visibility:hidden]'
          )}
        >
          <VisuallyHidden>
            <Dialog.Title>{'Mocca Living audio playlist 2024'}</Dialog.Title>
          </VisuallyHidden>
          <AudioPlayer playlist={playlist} />
          <Dialog.Close asChild>
            <Button
              aria-label='Close dialog'
              className='absolute top-3 right-3'
              variant='ghost-error'
              size='icon-normal'
            >
              <MinimizeIcon />
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

DialogAudioPlayerRe.displayName = 'DialogAudioPlayerRe'

export {DialogAudioPlayerRe}
