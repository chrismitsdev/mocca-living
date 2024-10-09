'use client'

import * as React from 'react'
import {getMobileOS} from '#/lib/utils'
import {MessageCircleMoreIcon} from 'lucide-react'
import {useScrollPosition} from '@/hooks/useScrollPosition'
import {cn} from '#/lib/utils'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogImage,
  DialogSubtitle,
  DialogClose,
  DialogContainer
} from '@/components/motion/dialog'

// Pre-populate sms body
// Android: href="sms:<phone number here>?body=<body text here>"
// iOS:     href="sms:<phone number here>&body=<body text here>"

function Messenger() {
  const [device, setDevice] = React.useState<
    ReturnType<typeof getMobileOS> | undefined
  >(undefined)
  const scrollPosition = useScrollPosition()
  const notMobile = device === 'Other'

  React.useEffect(
    function () {
      if (typeof window === 'undefined' || notMobile) return
      setDevice(getMobileOS())
    },
    [notMobile]
  )

  if (!device || notMobile) {
    return null
  }

  return (
    <a
      className={cn(
        'p-2 flex fixed -bottom-20 right-2 bg-success text-success-foreground rounded-full shadow duration-750 ease-mocca hover:bg-success-hover hover:shadow-medium hover:scale-110',
        scrollPosition > 100 && '-translate-y-[88px]'
      )}
      href='sms:+306936998859'
      aria-label='Open messaging app to send a text message'
    >
      <MessageCircleMoreIcon size={24} />
    </a>
  )
}

Messenger.displayName = 'Messenger'

export {Messenger}
