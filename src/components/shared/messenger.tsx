'use client'

import * as React from 'react'
import {getMobileOS} from '#/lib/utils'
import {PhoneIcon} from '@/components/social-icons/phone-icon'

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
      className='p-2 sticky bottom-5 left-5 w-fit bg-success text-success-foreground rounded-full shadow hover:scale-105 duration-200 hover:shadow-medium'
      href={`sms:+306973433980${
        device === 'Android' ? '?' : '&'
      }body=Παρακαλώ, επικοινωνήστε μαζί μου`}
    >
      <PhoneIcon size={24} />
    </a>
  )
}

Messenger.displayName = 'Messenger'

export {Messenger}
