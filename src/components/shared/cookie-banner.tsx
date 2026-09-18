'use client'

import {IconChevronDown, IconCookie} from '@tabler/icons-react'
import cookies from 'js-cookie'
import {useTranslations} from 'next-intl'
import {useEffect, useRef, useState} from 'react'
import {Button} from '@/src/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/src/components/ui/collapsible'
import {ScrollArea} from '@/src/components/ui/scrollarea'
import {Typography} from '@/src/components/ui/typography'
import {useScrollLock} from '@/src/hooks/useScrollLock'

const COOKIE_NAME = 'CONSENT_COOKIE'
const COOKIE_VALUE = 'true'
const EXPIRES_DAYS = 365

function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const bannerRef = useRef<HTMLDivElement | null>(null)
  const t = useTranslations('Components.cookie_consent_banner')
  useScrollLock({autoLock: showBanner})

  function handleClick() {
    cookies.set(COOKIE_NAME, COOKIE_VALUE, {expires: EXPIRES_DAYS})
    setShowBanner(false)
  }

  useEffect(() => {
    if (!cookies.get(COOKIE_NAME)) {
      setShowBanner(true)
    }
  }, [])

  useEffect(() => {
    if (!showBanner) return
    bannerRef.current?.focus()
  }, [showBanner])

  if (!showBanner) {
    return null
  }

  return (
    <div className='fixed inset-0 bg-black/75 z-50'>
      <div
        className='absolute inset-x-3 bottom-3 flex flex-col block-max max-block-[calc(100%-24px)] bg-surface-2 shadow-sm sm:top-1/2 sm:left-1/2 sm:-translate-1/2 sm:inline-lg'
        role='alertdialog'
        aria-labelledby='cookie-consent-title'
        aria-describedby='cookie-consent-message'
        tabIndex={-1}
        ref={bannerRef}
      >
        <ScrollArea className='flex-1 min-block-0 flex flex-col'>
          <div className='p-8 space-y-5'>
            <div className='flex items-center gap-2'>
              <IconCookie aria-hidden />
              <Typography
                id='cookie-consent-title'
                variant='h3'
              >
                {t('title')}
              </Typography>
            </div>
            <div className='space-y-4'>
              <Typography
                id='cookie-consent-message'
                className='text-sm leading-6 sm:text-base sm:leading-7'
              >
                {t('message')}
              </Typography>
              <Collapsible className='group'>
                <CollapsibleTrigger className='py-2 flex items-center gap-1.5'>
                  <Typography
                    className='font-bold'
                    variant='small'
                  >
                    {t('collapsible.trigger')}
                  </Typography>
                  <IconChevronDown
                    className='size-4 group-data-open:rotate-180'
                    aria-hidden
                  />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className='pt-2 space-y-4'>
                    <div>
                      <Typography variant='tiny'>
                        {t('collapsible.content.consent.title')}
                      </Typography>
                      <Typography variant='small'>
                        {t('collapsible.content.consent.description')}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant='tiny'>
                        {t('collapsible.content.locale.title')}
                      </Typography>
                      <Typography variant='small'>
                        {t('collapsible.content.locale.description')}
                      </Typography>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
            <Button
              className='inline-full'
              onClick={handleClick}
            >
              {t('button-label')}
            </Button>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export {CookieBanner}
