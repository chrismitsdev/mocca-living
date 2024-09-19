'use client'

import * as React from 'react'
import cookies from 'js-cookie'
import {useTranslations} from 'next-intl'
import {CookieIcon} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Typography} from '@/components/ui/typography'
import {useScrollLock} from '@/hooks/useScrollLock'

const COOKIE_NAME = 'COOKIE_CONSENT'
const EXPIRES_DAYS = 365

function CookieConsent() {
  const t = useTranslations<'Components.CookieConsent'>()
  const [showConsentBanner, setShowConsentBanner] = React.useState(false)
  useScrollLock({autoLock: showConsentBanner})

  function handleCookieConsent() {
    setShowConsentBanner(false)

    cookies.set(COOKIE_NAME, 'accepted', {expires: EXPIRES_DAYS})
  }

  React.useEffect(function () {
    if (typeof window === 'undefined') return
    const consentCookie = cookies.get(COOKIE_NAME)

    if (!consentCookie) {
      setShowConsentBanner(true)
    }
  }, [])

  if (!showConsentBanner) {
    return null
  }

  return (
    <section className='px-4 py-8 fixed inset-x-0 bottom-0 space-y-6 bg-brand-12 text-primary-foreground sm:px-8 sm:w-96 sm:inset-auto sm:bottom-8 sm:right-8 sm:rounded sm:shadow'>
      <div className='flex items-center gap-2'>
        <CookieIcon size={32} />
        <Typography variant='h3'>{t('title')}</Typography>
      </div>
      <Typography variant={'small'}>{t('message')}</Typography>
      <Button
        className='w-full sm:w-auto'
        onClick={handleCookieConsent}
      >
        {t('button-label')}
      </Button>
    </section>
  )
}

CookieConsent.displayName = 'CookieConsent'

export {CookieConsent}
