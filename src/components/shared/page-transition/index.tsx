'use client'

import {AnimatePresence, motion, type Variants} from 'motion/react'
import moccaLogo from '@/public/logos/mocca-logo.svg'
import {FrozenRouter} from '@/src/components/shared/page-transition/frozen-router'
import {usePathname} from '@/src/i18n/navigation'

const COLUMN_COUNT = 5

function PageTransition({children}: React.PropsWithChildren) {
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
          {Array.from({length: COLUMN_COUNT}).map((_, i) => {
            const count = COLUMN_COUNT - i
            const columnKey = `column-${count}`

            return (
              <motion.div
                key={columnKey}
                id='columns-transition-column'
                className='relative h-full w-full bg-surface-3'
                {...anim(column, count)}
              />
            )
          })}
          <picture>
            <motion.img
              src={moccaLogo.src}
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

export {PageTransition}
