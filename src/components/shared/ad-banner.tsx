'use client'

import {IconX} from '@tabler/icons-react'
import {useTranslations} from 'next-intl'
import {useEffect, useRef, useState} from 'react'
import {Container} from '@/src/components/shared/container'
import {IconButton} from '@/src/components/ui/icon-button'
import {Typography} from '@/src/components/ui/typography'
import {Link} from '@/src/i18n/navigation'

function AdBanner() {
  const [showBanner, setShowBanner] = useState(true)
  const t = useTranslations('Components.ad_banner')
  const bannerRef = useRef<HTMLDivElement>(null)

  function handleClick() {
    setShowBanner(false)
  }

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--banner-height',
      showBanner ? `${bannerRef.current?.offsetHeight}px` : '0px'
    )
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
        <div className='flex items-center gap-2'>
          <Typography className='grow'>
            {t.rich('description', {
              a: (chunks) => {
                return (
                  <Link
                    className='inline-block text-primary font-bold underline'
                    href='/accommodation/mocca-city/city-dimitra'
                  >
                    {chunks}
                  </Link>
                )
              }
            })}
          </Typography>
          <IconButton
            aria-label='Close banner'
            variant='outline'
            size='small'
            onClick={handleClick}
          >
            <IconX />
          </IconButton>
        </div>
      </Container>
    </div>
  )
}

AdBanner.displayName = 'AdBanner'

export {AdBanner}
