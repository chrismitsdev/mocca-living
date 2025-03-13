'use client'

import {AnimatePresence, motion, type Variants} from 'framer-motion'
import {usePathname} from '@/src/i18n/navigation'
import {FrozenRouter} from '@/src/components/shared/route-transitions/frozen-router'
import boxLogo from '@/public/logos/mocca-logo-box.svg'

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

  const columns = 5

  return (
    <AnimatePresence mode='wait'>
      <div key={pathname}>
        <motion.div
          id='overlay'
          className='fixed inset-0 pointer-events-none z-50 bg-black'
          {...anim(overlay)}
        />
        <div
          id='columns-container'
          className='fixed inset-0 pointer-events-none z-50 flex'
        >
          {Array.from({length: columns}).map(function (_, i) {
            return (
              <motion.div
                key={i}
                id='column'
                className='relative h-full w-full bg-surface-3'
                {...anim(column, columns - i)}
              />
            )
          })}

          <motion.img
            src={boxLogo.src}
            alt='Brand Logo'
            className='absolute top-1/2 left-1/2 -translate-1/2 w-24 h-24'
            {...anim(logo)}
          />
        </div>

        <FrozenRouter>{children}</FrozenRouter>
      </div>
    </AnimatePresence>
  )
}

ColumnsTransition.displayName = 'ColumnsTransition'

export {ColumnsTransition}
