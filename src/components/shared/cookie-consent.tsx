'use client'

import * as React from 'react'
import cookie from 'js-cookie'
import {Button} from '@/components/ui/button'
import {Typography} from '@/components/ui/typography'
import {CookieIcon} from '@radix-ui/react-icons'

const CONSENT_COOKIE = 'COOKIE_CONSENT'
const ACCEPTED_EXPIRE_DATE = 365
const REJECTED_EXPIRE_DATE = 1

function CookieConsent() {
  const [showBanner, setShowBanner] = React.useState(false)
  
  React.useEffect(
    function() {
      const consentCookie = cookie.get(CONSENT_COOKIE)

      if (!consentCookie) {
        setShowBanner(true)
      }
    },
    []
  )

  function handleCookieConsent(hasConsented: boolean) {
    setShowBanner(false)
    
    cookie.set(
      CONSENT_COOKIE, 
      hasConsented ? 'accepted' : 'rejected', 
      {expires: hasConsented ? ACCEPTED_EXPIRE_DATE : REJECTED_EXPIRE_DATE}
    )
  }

  if (!showBanner) {
    return null
  }

  /* eslint-disable react/jsx-no-literals */
  return (
    <article className='px-4 py-8 space-y-6 bg-brand-12 text-primary-foreground rounded shadow-lg sm:w-96 sm:fixed sm:bottom-4 sm:right-4 sm:px-8'>
      <div className='flex items-center gap-2'>
        <CookieIcon width={32} height={32} />
        <Typography variant='h3'>Cookies</Typography>
      </div>
      <Typography>
        By using our website, you agree to our cookie policy to provide a better user and website experience.
      </Typography>
      <div className='flex flex-wrap gap-4'>
        <Button
          variant='successive'
          className='grow' 
          onClick={() => handleCookieConsent(true)}
        >
          {'Accept'}
        </Button>
        <Button 
          variant='destructive'
          className='grow' 
          onClick={() => handleCookieConsent(false)}
        >
          {'Reject'}
        </Button>
      </div>
    </article>
  )
}

CookieConsent.displayName = 'CookieConsent'

export {CookieConsent}