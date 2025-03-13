'use client'

import * as React from 'react'
import {useTranslations} from 'next-intl'
import cookies from 'js-cookie'
import {CookieIcon} from 'lucide-react'
import {useScrollLock} from '@/src/hooks/useScrollLock'
import {Typography} from '@/src/components/ui/typography'
import {Button} from '@/src/components/ui/button'

const COOKIE_NAME = 'CONSENT_COOKIE'
const COOKIE_VALUE = 'true'
const EXPIRES_DAYS = 365

const CookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = React.useState(false)
  const t = useTranslations('Components.CookieConsent')
  useScrollLock({autoLock: showBanner})

  function handleClick() {
    if (!cookies.get(COOKIE_NAME)) {
      cookies.set(COOKIE_NAME, COOKIE_VALUE, {expires: EXPIRES_DAYS})
    }

    setShowBanner(false)
  }

  React.useEffect(function () {
    if (!cookies.get(COOKIE_NAME)) {
      setShowBanner(true)
    }
  }, [])

  if (!showBanner) {
    return null
  }

  return (
    <div
      id='consent-cookie-overlay'
      className='fixed inset-0 bg-black/75 z-50'
    >
      <div
        id='consent-cookie-banner'
        className='p-8 absolute bottom-2 left-2 w-[calc(100%-16px)] bg-surface-2 space-y-5 rounded shadow-small sm:bottom-1/2 sm:left-1/2 sm:translate-y-1/2 sm:-translate-x-1/2 sm:w-lg'
        role='dialog'
        aria-live='polite'
      >
        <div className='flex items-center gap-3'>
          <CookieIcon
            className='mt-0.5'
            size={24}
          />
          <Typography
            variant='h3'
            asChild
          >
            <h3>{t('title')}</h3>
          </Typography>
        </div>
        <Typography
          className='text-sm sm:text-base'
          asChild
        >
          <p>{t('message')}</p>
        </Typography>
        <Button
          className='w-full'
          type='submit'
          onClick={handleClick}
        >
          {t('button-label')}
        </Button>
      </div>
    </div>
  )
}

CookieConsent.displayName = 'CookieConsent'

export {CookieConsent}
