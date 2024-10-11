'use client'

import {motion} from 'framer-motion'

type FadeUpProps = {
  delay?: number
  duration?: number
  once?: boolean
  children: React.ReactNode
}

function FadeUp({
  delay = 0.35,
  duration = 0.75,
  once = true,
  children
}: FadeUpProps) {
  return (
    <motion.div
      variants={{
        hidden: {opacity: 0, y: 16},
        visible: {opacity: 1, y: 0}
      }}
      initial='hidden'
      whileInView='visible'
      transition={{
        delay,
        duration,
        type: 'spring'
      }}
      viewport={{once}}
    >
      {children}
    </motion.div>
  )
}

FadeUp.displayName = 'FadeUp'

export {FadeUp}
