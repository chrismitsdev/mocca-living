'use client'

import React from 'react'
import {Toaster as SonnerToaster, toast as sonnerToast} from 'sonner'

const Toaster: React.FC<React.ComponentProps<typeof SonnerToaster>> = (
  props
) => {
  return (
    <SonnerToaster
      toastOptions={{
        unstyled: true,
        classNames: {
          default:
            'shrink-0 p-6 w-full bg-surface-2 border border-muted rounded shadow-medium group',
          success:
            'flex gap-2 items-center !bg-green-3 !border-border-success text-success',
          error:
            'flex gap-2 items-center !bg-red-3 !border-border-error text-error',
          info: 'flex gap-2 items-center !bg-blue-3 !border-border-info text-info',
          warning:
            'flex gap-2 items-center !bg-yellow-3 !border-border-warning',
          closeButton:
            'bg-primary text-primary-foreground border-primary hover:!bg-error hover:!text-error-foreground hover:!border-error left-[calc(100%-5px)] group-data-success:bg-red-9 group-data-error:bg-red-9 group-data-info:bg-red-9 group-data-warning:bg-red-9 group-data-success:border-red-9 group-data-error:border-red-9 group-data-info:border-red-9 group-data-warning:border-red-9',
          icon: 'm-0 mt-0.5 shrink-0 w-5 h-5 self-start',
          description: 'leading-normal'
        },
        closeButton: true
      }}
      {...props}
    />
  )
}

function toast({
  title,
  description,
  status
}: {
  title: React.ReactNode
  description?: React.ReactNode
  status?: 'success' | 'error' | 'info' | 'warning'
}) {
  if (!status) {
    return sonnerToast(title, {description})
  } else {
    return sonnerToast[status](title, {description})
  }
}

export {Toaster, toast}
