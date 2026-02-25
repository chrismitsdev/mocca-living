'use client'

import {AnimatePresence, motion, type Variants} from 'motion/react'
import moccaLogoBox from '@/public/logos/mocca-logo-box.svg'
import {FrozenRouter} from '@/src/components/shared/route-transitions/frozen-router'
import {usePathname} from '@/src/i18n/navigation'

const ColumnsTransition: React.FC<React.PropsWithChildren> = ({children}) => {
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

  const column = {
    initial: {
      top: 0
    },
    enter: (i: number) => {
      return {
        top: '100%',
        transition: {
          duration: 0.4,
          delay: 0.05 * i
        },
        transitionEnd: {
          top: 0,
          height: 0
        }
      }
    },
    exit: (i: number) => {
      return {
        height: '100%',
        transition: {
          duration: 0.4,
          delay: 0.05 * i
        }
      }
    }
  }

  const overlay = {
    initial: {
      opacity: 0.75
    },
    enter: {
      opacity: 0,
      transition: {
        duration: 0.4
      }
    },
    exit: {
      opacity: 0.75
    }
  }

  const logo = {
    initial: {
      opacity: 1
    },
    enter: {
      opacity: 0
    },
    exit: {
      opacity: 1
    }
  }

  return (
    <AnimatePresence mode='wait'>
      <div key={pathname}>
        <motion.div
          id='columns-transition-overlay'
          className='fixed inset-0 pointer-events-none z-50 bg-black'
          {...anim(overlay)}
        />
        <div
          id='columns-transition-container'
          className='fixed inset-0 pointer-events-none z-50 flex'
        >
          <motion.div
            id='columns-transition-column'
            className='relative h-full w-full bg-surface-3'
            {...anim(column, 5)}
          />
          <motion.div
            id='columns-transition-column'
            className='relative h-full w-full bg-surface-3'
            {...anim(column, 4)}
          />
          <motion.div
            id='columns-transition-column'
            className='relative h-full w-full bg-surface-3'
            {...anim(column, 3)}
          />
          <motion.div
            id='columns-transition-column'
            className='relative h-full w-full bg-surface-3'
            {...anim(column, 2)}
          />
          <motion.div
            id='columns-transition-column'
            className='relative h-full w-full bg-surface-3'
            {...anim(column, 1)}
          />

          <picture>
            <motion.img
              src={moccaLogoBox.src}
              alt='Brand Logo'
              className='absolute top-1/2 left-1/2 -translate-1/2 w-24 h-24'
              {...anim(logo)}
            />
          </picture>
        </div>

        <FrozenRouter>{children}</FrozenRouter>
      </div>
    </AnimatePresence>
  )
}

ColumnsTransition.displayName = 'ColumnsTransition'

export {ColumnsTransition}
