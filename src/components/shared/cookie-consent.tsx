'use client'

import * as React from 'react'
import cookies from 'js-cookie'
import {CookieIcon} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Typography} from '@/components/ui/typography'

type CookieConsentProps = {
  title: string
  message: string
  acceptLabel: string
  rejectLabel: string
}

const CONSENT_COOKIE_NAME = 'COOKIE_CONSENT'
const ACCEPTED_EXPIRE_DATE = 365
const REJECTED_EXPIRE_DATE = 1

function CookieConsent({title, message, acceptLabel, rejectLabel}: CookieConsentProps) {
  const [showBanner, setShowBanner] = React.useState(false)

  React.useEffect(function () {
    const consentCookie = cookies.get(CONSENT_COOKIE_NAME)

    if (!consentCookie) {
      setShowBanner(true)
    }
  }, [])

  function handleCookieConsent(consent: boolean) {
    setShowBanner(false)

    cookies.set(CONSENT_COOKIE_NAME, consent ? 'accepted' : 'rejected', {
      expires: consent ? ACCEPTED_EXPIRE_DATE : REJECTED_EXPIRE_DATE
    })
  }

  if (!showBanner) {
    return null
  }

  /* eslint-disable react/jsx-no-literals */
  return (
    <section className='px-4 py-8 fixed inset-x-0 bottom-0 space-y-6 bg-brand-12 text-primary-foreground sm:px-8 sm:w-96 sm:inset-auto sm:bottom-4 sm:right-4 sm:rounded sm:shadow'>
      <div className='flex items-center gap-2'>
        <CookieIcon size={32} />
        <Typography variant='h3'>{title}</Typography>
      </div>
      <Typography>{message}</Typography>
      <div className='flex flex-wrap gap-4'>
        <Button
          className='grow'
          onClick={() => handleCookieConsent(true)}
        >
          {acceptLabel}
        </Button>
        <Button
          className='grow'
          onClick={() => handleCookieConsent(false)}
        >
          {rejectLabel}
        </Button>
      </div>
    </section>
  )
}

CookieConsent.displayName = 'CookieConsent'

export {CookieConsent}
