'use client'

import * as React from 'react'
import {getMobileOS} from '#/lib/utils'
import {ChatBubbleIcon} from '@radix-ui/react-icons'

function Messenger() {
  const [device, setDevice] = React.useState<ReturnType<typeof getMobileOS>>('Other')

  React.useEffect(function () {
    if (typeof window === undefined) return
    setDevice(getMobileOS())
  }, [])

  if (device === 'Other') {
    return null
  }

  return (
    <a
      className='p-2 flex fixed bottom-4 left-4 bg-success text-success-foreground rounded-full shadow hover:bg-success-hover hover:shadow-medium hover:scale-110 duration-200'
      href={`sms:+306973433980`}
    >
      <ChatBubbleIcon
        width={24}
        height={24}
      />
    </a>
  )
}

Messenger.displayName = 'Messenger'

export {Messenger}
