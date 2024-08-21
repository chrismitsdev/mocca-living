'use client'

import {useRouter} from '@/navigation'
import {Dialog, DialogPortal, DialogOverlay, DialogContent, DialogTitle} from '@/components/ui/dialog'
import {VisuallyHidden} from '@/components/ui/visually-hidden'

function InterceptorModal({children}: {children: React.ReactNode}) {
  const router = useRouter()

  function handleOpenChange() {
    router.back()
  }

  return (
    <Dialog
      defaultOpen={true}
      // open={true}
      onOpenChange={handleOpenChange}
    >
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <VisuallyHidden>
            <DialogTitle>{'Contact form modal'}</DialogTitle>
          </VisuallyHidden>
          {children}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

InterceptorModal.displayName = 'InterceptorModal'

export {InterceptorModal}
