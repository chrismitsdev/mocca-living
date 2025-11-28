'use client'

import {CircleAlertIcon, CircleCheckIcon, XIcon} from 'lucide-react'
import {toast as sonnerToast} from 'sonner'
import {Button} from '@/src/components/ui/button'
import {Typography} from '@/src/components/ui/typography'
import {cn} from '@/src/lib/utils'

interface ToastProps {
  id: string | number
  title: string
  description: string
  status?: 'default' | 'success' | 'error'
}

const Toast: React.FC<ToastProps> = ({
  id,
  title,
  description,
  status = 'default'
}) => {
  return (
    <div
      className={cn(
        'pl-4 py-4 pr-10 relative bg-surface-2 border border-surface-3 rounded shadow-small',
        status === 'success' && 'bg-success-foreground border-green-7',
        status === 'error' && 'bg-error-foreground border-red-7'
      )}
    >
      <div className='flex gap-2'>
        {status === 'success' && (
          <CircleCheckIcon className='mt-0.5 shrink-0 size-5 text-success' />
        )}
        {status === 'error' && (
          <CircleAlertIcon className='mt-0.5 shrink-0 size-5 text-error' />
        )}
        <div className='space-y-1'>
          <Typography variant='h5'>{title}</Typography>
          <Typography variant='small'>{description}</Typography>
        </div>
      </div>
      <div className='absolute top-1 right-1'>
        <Button
          variant='ghost-error'
          size='icon-mini'
          onClick={() => sonnerToast.dismiss(id)}
        >
          <XIcon size={16} />
        </Button>
      </div>
    </div>
  )
}

function toast(toast: Omit<ToastProps, 'id'>) {
  return sonnerToast.custom((id) => {
    return (
      <Toast
        id={id}
        title={toast.title}
        description={toast.description}
        status={toast.status}
      />
    )
  })
}

Toast.displayName = 'Toast'

export {Toast, toast}
