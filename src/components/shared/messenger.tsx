'use client'

import * as React from 'react'
import {getMobileOS} from '#/lib/utils'
import {MessageCircleMoreIcon} from 'lucide-react'
import {useScrollPosition} from '@/hooks/useScrollPosition'
import {cn} from '#/lib/utils'

// Pre-populate sms body
// Android: href="sms:/* phone number here */?body=/* body text here */"
// iOS:     href="sms:/* phone number here */&body=/* body text here */"

function Messenger() {
  const [device, setDevice] = React.useState<ReturnType<typeof getMobileOS> | undefined>(undefined)
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
        'p-2 flex fixed -bottom-10 left-2 bg-success text-success-foreground rounded-full shadow hover:bg-success-hover hover:shadow-medium hover:scale-110 duration-300',
        scrollPosition > 100 && '-translate-y-14'
      )}
      href='sms:+306973433980'
      aria-label='Open messaging app to send a text'
    >
      <MessageCircleMoreIcon size={24} />
    </a>
  )
}

Messenger.displayName = 'Messenger'

export {Messenger}
