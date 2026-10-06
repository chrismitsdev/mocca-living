'use client'

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants
} from 'motion/react'
import Image from 'next/image'
import moccaLogo from '@/public/logos/mocca-logo.svg'
import {usePathname} from '@/src/i18n/navigation'
import {FrozenRouter} from './frozen-router'

const EASE = [0.76, 0, 0.24, 1] as const

const slide: Variants = {
  initial: {y: '100%'},
  enter: {y: '100%'},
  exit: {
    y: 0,
    opacity: 0,
    transition: {
      y: {duration: 1, ease: EASE},
      opacity: {duration: 0.6, delay: 1.3, ease: 'easeInOut'}
    }
  }
}

const perspective: Variants = {
  initial: {y: 0, scale: 1, opacity: 1},
  enter: {y: 0, scale: 1, opacity: 1},
  exit: {
    y: -100,
    scale: 0.9,
    opacity: 0.5,
    transition: {duration: 1.2, ease: EASE}
  }
}

const anim = (variants: Variants) => ({
  initial: 'initial',
  animate: 'enter',
  exit: 'exit',
  variants
})

function PageTransition({children}: React.PropsWithChildren) {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()

  if (reduceMotion) return children

  return (
    <>
      <AnimatePresence initial={false}>
        <motion.div
          key={pathname}
          aria-hidden
          className='fixed inset-0 bg-surface-3 z-100 flex justify-center items-center'
          {...anim(slide)}
        >
          <Image
            src={moccaLogo}
            alt=''
            loading='eager'
          />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence
        mode='wait'
        initial={false}
      >
        <div
          key={pathname}
          className='bg-black'
        >
          <motion.div
            className='origin-top'
            {...anim(perspective)}
          >
            <FrozenRouter>{children}</FrozenRouter>
          </motion.div>
        </div>
      </AnimatePresence>
    </>
  )
}

export {PageTransition}
