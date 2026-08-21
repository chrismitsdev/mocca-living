'use client'

import {IconX} from '@tabler/icons-react'
import {useTranslations} from 'next-intl'
import {useEffect, useRef, useState} from 'react'
import {Container} from '@/src/components/shared/container'
import {IconButton} from '@/src/components/ui/icon-button'
import {Typography} from '@/src/components/ui/typography'

const HEADER_VARIABLE = '--header-height'

function MinimumStayBanner() {
  const [showBanner, setShowBanner] = useState(true)
  const t = useTranslations('Components.minimum_stay_banner')
  const bannerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const root = document.documentElement
    const originalHeaderHeight = Number.parseInt(
      window.getComputedStyle(root).getPropertyValue(HEADER_VARIABLE),
      10
    )

    if (!showBanner) {
      root.style.setProperty(HEADER_VARIABLE, `${originalHeaderHeight}px`)
      return
    }

    const bannerHeight = bannerRef.current?.offsetHeight ?? 0
    root.style.setProperty(
      HEADER_VARIABLE,
      `${originalHeaderHeight + bannerHeight}px`
    )

    return () => {
      root.style.setProperty(HEADER_VARIABLE, `${originalHeaderHeight}px`)
    }
  }, [showBanner])

  if (!showBanner) {
    return null
  }

  return (
    <div
      className='py-4 bg-surface-4 border-b border-b-surface-5'
      ref={bannerRef}
    >
      <Container>
        <div className='flex gap-x-2 sm:items-center'>
          <Typography
            className='grow text-primary font-black'
            variant='small'
          >
            {t('title')}
          </Typography>
          <IconButton
            variant='outline'
            size='small'
            aria-label='Close banner'
            onClick={() => setShowBanner(false)}
          >
            <IconX />
          </IconButton>
        </div>
      </Container>
    </div>
  )
}

MinimumStayBanner.displayName = 'MinimumStayBanner'

export {MinimumStayBanner}
