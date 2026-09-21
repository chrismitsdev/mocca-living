'use client'

import {
  AnimatePresence,
  motion,
  type Variant,
  type Variants
} from 'motion/react'
import Image from 'next/image'
import moccaLogo from '@/public/logos/mocca-logo.svg'
import {Header} from '@/src/components/shared/header'
import {usePathname} from '@/src/i18n/navigation'
import {FrozenRouter} from './frozen-router'

type AnimationVariants = Record<'initial' | 'enter' | 'exit', Variant>

function PageTransition({children}: React.PropsWithChildren) {
  const pathname = usePathname()

  const anim = (variants: Variants) => {
    return {
      initial: 'initial',
      animate: 'enter',
      exit: 'exit',
      variants
    }
  }

  const fade: AnimationVariants = {
    initial: {
      opacity: 0
    },
    enter: {
      opacity: 1,
      transition: {
        duration: 0
      }
    },
    exit: {
      opacity: 1
    }
  }

  const slide: AnimationVariants = {
    initial: {
      y: '100%',
      opacity: 1
    },
    enter: {
      y: '100%',
      opacity: 1
    },
    exit: {
      y: 0,
      opacity: 0,
      transition: {
        y: {
          duration: 1,
          ease: [0.76, 0, 0.24, 1]
        },
        opacity: {
          duration: 0.6,
          delay: 1.3,
          ease: 'easeInOut'
        }
      }
    }
  }

  const perspective: AnimationVariants = {
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
        ease: [0.76, 0, 0.24, 1]
      }
    }
  }

  return (
    <>
      <AnimatePresence mode='sync'>
        <motion.div
          key={pathname}
          className='fixed inset-0 bg-surface-3 z-100 flex justify-center items-center'
          {...anim(slide)}
        >
          <Image
            src={moccaLogo}
            alt='Mocca Living logo'
          />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode='wait'>
        <div
          key={pathname}
          className='bg-black'
        >
          <motion.div
            className='origin-top'
            {...anim(perspective)}
          >
            <motion.div {...anim(fade)}>
              <Header />
              <FrozenRouter>{children}</FrozenRouter>
            </motion.div>
          </motion.div>
        </div>
      </AnimatePresence>
    </>
  )
}

export {PageTransition}
