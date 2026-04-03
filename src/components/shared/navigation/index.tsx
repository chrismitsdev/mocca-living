'use client'

import {useEffect, useState} from 'react'
import {useScrollLock} from '@/src/hooks/useScrollLock'
import {usePathname} from '@/src/i18n/navigation'
import {DesktopNavigation} from './desktop-navigation'
import {MobileNavigation} from './mobile-navigation'

function Navigation() {
  const [popupOpen, setPopupOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const pathname = usePathname()
  useScrollLock({autoLock: drawerOpen})

  useEffect(() => {
    if (!pathname) return

    setPopupOpen(false)
    setDrawerOpen(false)
  }, [pathname])

  return (
    <>
      <DesktopNavigation
        open={popupOpen}
        onOpenChange={setPopupOpen}
      />
      <MobileNavigation
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </>
  )
}

Navigation.displayName = 'Navigation'

export {Navigation}
