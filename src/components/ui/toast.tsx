'use client'

import {
  IconCircleCheck,
  IconCircleX,
  type IconProps,
  IconX
} from '@tabler/icons-react'
import {toast as sonnerToast} from 'sonner'
import {IconButton} from '@/src/components/ui/icon-button'
import {Typography} from '@/src/components/ui/typography'
import {cn} from '@/src/lib/utils'

interface ToastProps {
  id: string | number
  title: string
  description: string
  status: 'success' | 'error'
}

const icons: Record<ToastProps['status'], React.ComponentType<IconProps>> = {
  success: IconCircleCheck,
  error: IconCircleX
}

function Toast({id, title, description, status}: ToastProps) {
  const Icon = icons[status]

  return (
    <div
      className={cn(
        'p-6 border shadow-md',
        status === 'success' && 'bg-success-foreground border-success',
        status === 'error' && 'bg-danger-foreground border-danger'
      )}
    >
      <div className='flex gap-2'>
        <Icon
          className={cn(
            'shrink-0',
            status === 'success' && 'text-success',
            status === 'error' && 'text-danger'
          )}
        />
        <div className='space-y-1'>
          <Typography variant='large'>{title}</Typography>
          <Typography variant='small'>{description}</Typography>
        </div>
      </div>
      <div className='absolute inset-bs-4 inset-e-4'>
        <IconButton
          aria-label='Close toast notification'
          variant='ghost'
          size='small'
          onClick={() => sonnerToast.dismiss(id)}
        >
          <IconX />
        </IconButton>
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

export {toast}
