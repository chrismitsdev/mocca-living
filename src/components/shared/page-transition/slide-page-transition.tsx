'use client'

import {
  AnimatePresence,
  motion,
  useIsPresent,
  usePresenceData,
  useReducedMotion,
  type Variants
} from 'motion/react'
import {useLayoutEffect, useRef, useState} from 'react'
import {usePathname} from '@/src/i18n/navigation'
import {FrozenRouter} from './frozen-router'

// 1 = deeper (forward), -1 = back up
type Direction = 1 | -1

// What the leaving page needs: the direction, and how far the window was
// scrolled when the route changed
type Navigation = {direction: Direction; scrollY: number}

const depth = (pathname: string) => pathname.split('/').filter(Boolean).length

// The page on top slides the full width; the one beneath moves only 30% and
// dims, so the motion stays calm. Going deeper the new page slides in over
// the old one, going back the current page slides off and reveals the
// previous one
const OVER = {x: '100%', opacity: 1, zIndex: 1}
const UNDER = {x: '-30%', opacity: 0.5, zIndex: 0}

const slide: Variants = {
  initial: ({direction}: Navigation) => (direction === 1 ? OVER : UNDER),
  enter: {x: 0, opacity: 1},
  exit: ({direction}: Navigation) => (direction === 1 ? UNDER : OVER)
}

/**
 * Keeps a leaving page where it was on screen. The window scroll jumps when
 * the new page arrives (to the top going deeper, back down when the browser
 * restores a scrolled page), so the leaving page follows it: its offset is
 * the current scroll minus the scroll it had when the route changed. The
 * offset is written straight to the element, before paint and in the scroll
 * event (which runs before the frame is painted), so it never lags a frame
 */
function PinWhileLeaving({children}: React.PropsWithChildren) {
  const isPresent = useIsPresent()
  const navigation = usePresenceData() as Navigation | undefined
  const leftAtScrollY = navigation?.scrollY ?? 0
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (isPresent) return
    const pin = () => {
      if (ref.current) {
        ref.current.style.transform = `translateY(${window.scrollY - leftAtScrollY}px)`
      }
    }
    pin()
    window.addEventListener('scroll', pin, {passive: true})
    return () => window.removeEventListener('scroll', pin)
  }, [isPresent, leftAtScrollY])

  return <div ref={ref}>{children}</div>
}

/**
 * Sideways page transition, used by the guest app, like a phone app: going
 * deeper the new page comes in from the right, going back (link, browser or
 * swipe) from the left. Both pages move at once; the old one keeps its
 * content frozen
 */
function SlidePageTransition({children}: React.PropsWithChildren) {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const [route, setRoute] = useState<{pathname: string} & Navigation>({
    pathname,
    direction: 1,
    scrollY: 0
  })

  // Once per navigation, during render (before Next resets the scroll)
  if (route.pathname !== pathname) {
    setRoute({
      pathname,
      direction: depth(pathname) < depth(route.pathname) ? -1 : 1,
      scrollY: window.scrollY
    })
  }

  const navigation: Navigation = {
    direction: route.direction,
    scrollY: route.scrollY
  }

  if (reduceMotion) return children

  return (
    <div className='relative flex-1 grid overflow-clip'>
      <AnimatePresence
        mode='popLayout'
        initial={false}
        custom={navigation}
      >
        <motion.div
          className='relative bg-surface-1'
          key={pathname}
          custom={navigation}
          variants={slide}
          initial='initial'
          animate='enter'
          exit='exit'
          transition={{duration: 0.5, ease: [0.4, 0, 0.2, 1]}}
        >
          <PinWhileLeaving>
            <FrozenRouter>{children}</FrozenRouter>
          </PinWhileLeaving>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export {SlidePageTransition}
