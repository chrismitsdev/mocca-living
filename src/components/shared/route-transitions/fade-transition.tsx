'use client'

import {AnimatePresence, motion} from 'motion/react'
import type * as React from 'react'
import {FrozenRouter} from '@/src/components/shared/route-transitions/frozen-router'
import {usePathname} from '@/src/i18n/navigation'

const FadeTransition: React.FC<React.PropsWithChildren> = ({children}) => {
  const pathname = usePathname()

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={pathname}
        className='space-y-32'
        initial={{opacity: 0, transform: 'translateY(24px)'}}
        animate={{opacity: 1, transform: 'translateY(0px)'}}
        exit={{opacity: 0, transform: 'translateY(24px)'}}
        // initial={{opacity: 0, translateY: 24}}
        // animate={{opacity: 1, translateY: 0}}
        // exit={{opacity: 0, translateY: 24}}
        transition={{duration: 0.5, type: 'tween'}}
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  )
}

FadeTransition.displayName = 'FadeTransition'

export {FadeTransition}
