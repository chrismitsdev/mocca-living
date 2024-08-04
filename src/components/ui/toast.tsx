'use client'

import React from 'react'
import {Toaster as SonnerToaster, toast as sonnerToast} from 'sonner'

type ToasterProps = React.ComponentProps<typeof SonnerToaster>

function Toaster({...props}: ToasterProps) {
  return (
    <SonnerToaster
      toastOptions={{
        unstyled: true,
        classNames: {
          default: 'shrink-0 p-6 w-full bg-surface-2 border border-muted rounded shadow-medium group',
          success: 'flex gap-2 items-center !bg-success !border-border-success text-success-foreground',
          error: 'flex gap-2 items-center !bg-error !border-border-error text-error-foreground',
          info: 'flex gap-2 items-center !bg-info !border-border-info text-info-foreground',
          warning: 'flex gap-2 items-center !bg-warning !border-border-warning text-warning-foreground',
          closeButton: 'bg-primary text-primary-foreground border-primary hover:!bg-error hover:!text-error-foreground hover:!border-error left-[calc(100%-5px)] group-data-success:bg-red-9 group-data-error:bg-red-9 group-data-info:bg-red-9 group-data-warning:bg-red-9 group-data-success:border-red-9 group-data-error:border-red-9 group-data-info:border-red-9 group-data-warning:border-red-9',
          icon: 'm-0 mt-0.5 shrink-0 w-5 h-5 self-start',
          description: 'leading-normal'
        },
        closeButton: true,
      }}
      {...props}
    />
  )
}


function toast(
  title: string, 
  description?: React.ReactNode, 
  type?: 'success' | 'info' | 'warning' | 'error'
) {
  if (!type) {
    return sonnerToast(title, {description})
  } else {
    return sonnerToast[type](title, {description})
  }
}

export {Toaster, toast}
