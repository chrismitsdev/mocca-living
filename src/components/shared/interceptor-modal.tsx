'use client'

import * as React from 'react'
import {useRouter} from '@/i18n/routing'
import {cn} from '#/lib/utils'
import {XIcon} from 'lucide-react'
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
  DialogContent,
  DialogClose
} from '@/components/ui/dialog'
import {Button} from '@/components/ui/button'
import {VisuallyHidden} from '@/components/ui/visually-hidden'

type InterceptorModalProps = React.PropsWithChildren<{className?: string}>

function InterceptorModal({className, children}: InterceptorModalProps) {
  const router = useRouter()

  function handleOpenChange() {
    router.back()
  }

  return (
    <Dialog
      defaultOpen={true}
      open={true}
      onOpenChange={handleOpenChange}
    >
      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          className={cn(
            'p-0 w-[calc(100%-32px)] h-[calc(100dvh-32px)] sm:h-auto sm:w-full sm:max-w-3xl',
            className
          )}
        >
          {children}
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

InterceptorModal.displayName = 'InterceptorModal'

export {InterceptorModal}
