'use client'

import cookies from 'js-cookie'
import {ChevronDownIcon, CookieIcon} from 'lucide-react'
import {useTranslations} from 'next-intl'
import * as React from 'react'
import {Button} from '@/src/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/src/components/ui/collapsible'
import {
  ScrollArea,
  ScrollAreaBar,
  ScrollAreaViewport
} from '@/src/components/ui/scrollarea'
import {Typography} from '@/src/components/ui/typography'
import {useScrollLock} from '@/src/hooks/useScrollLock'

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

  React.useEffect(() => {
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
        className='absolute bottom-2 left-2 w-[calc(100%-16px)] bg-surface-2 rounded shadow-small sm:bottom-1/2 sm:left-1/2 sm:translate-y-1/2 sm:-translate-x-1/2 sm:w-lg'
        role='dialog'
        aria-live='polite'
      >
        <ScrollArea type='always'>
          <ScrollAreaViewport className='max-h-[calc(100dvh-16px)]'>
            <div className='p-8 space-y-4'>
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
              <Collapsible className='leading-none'>
                <CollapsibleTrigger className='w-full flex items-center gap-1.5'>
                  <Typography
                    className='font-semibold'
                    variant='small'
                  >
                    {t('collapsible.trigger')}
                  </Typography>
                  <ChevronDownIcon
                    className='mt-1 transition-transform group-data-open:rotate-180'
                    size={16}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className='pt-2 space-y-4'>
                    <div>
                      <Typography variant='mini'>
                        {t('collapsible.content.consent.title')}
                      </Typography>
                      <Typography variant='small'>
                        {t('collapsible.content.consent.description')}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant='mini'>
                        {t('collapsible.content.locale.title')}
                      </Typography>
                      <Typography variant='small'>
                        {t('collapsible.content.locale.description')}
                      </Typography>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
              <div className='pt-2'>
                <Button
                  className='w-full'
                  type='submit'
                  onClick={handleClick}
                >
                  {t('button-label')}
                </Button>
              </div>
            </div>
          </ScrollAreaViewport>
          <ScrollAreaBar />
        </ScrollArea>
      </div>
    </div>
  )
}

CookieConsent.displayName = 'CookieConsent'

export {CookieConsent}
