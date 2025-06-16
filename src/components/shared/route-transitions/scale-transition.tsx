'use client'

import * as React from 'react'
import {AnimatePresence, motion, type Variants} from 'framer-motion'
import {FrozenRouter} from '@/src/components/shared/route-transitions/frozen-router'
import {usePathname} from '@/src/i18n/navigation'

const ScaleTransition: React.FC<React.PropsWithChildren> = ({children}) => {
  const pathname = usePathname()

  function anim(variants: Variants, custom?: number) {
    return {
      initial: 'initial',
      animate: 'enter',
      exit: 'exit',
      variants,
      custom
    }
  }

  const bezierEase = [0.76, 0, 0.24, 1] as const

  const opacity = {
    initial: {
      opacity: 0
    },
    enter: {
      opacity: 1
    },
    exit: {
      opacity: 1
    }
  }

  const slide = {
    initial: {
      top: '100vh'
    },
    enter: {
      top: '100vh'
    },
    exit: {
      top: '0',
      transition: {
        duration: 1,
        ease: bezierEase
      }
    }
  }

  const perspective = {
    initial: {
      y: 0,
      scale: 1,
      opacity: 1
    },
    enter: {
      y: 0,
      scale: 1,
      opacity: 1
    },
    exit: {
      y: -100,
      scale: 0.9,
      opacity: 0.5,
      transition: {
        duration: 1.2,
        ease: bezierEase
      }
    }
  }

  return (
    <AnimatePresence mode='wait'>
      <div key={pathname}>
        <div
          id='inner'
          className='bg-black'
        >
          <motion.div
            id='slide'
            className='fixed top-0 left-0 w-screen h-screen bg-surface-1 z-10'
            {...anim(slide)}
          />
          <motion.div
            id='page'
            className='bg-surface-1'
            {...anim(perspective)}
          >
            <motion.div {...anim(opacity)}>
              <FrozenRouter>{children}</FrozenRouter>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  )
}

ScaleTransition.displayName = 'ScaleTransition'

export {ScaleTransition}
