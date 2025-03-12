'use client'

import {motion} from 'framer-motion'
import type React from 'react'

export default function Template({
  children
}: Readonly<React.PropsWithChildren>) {
  return (
    <motion.div
      className='space-y-32'
      initial={{y: 24, opacity: 0}}
      animate={{y: 0, opacity: 1}}
      transition={{type: 'spring', duration: 5}}
    >
      {children}
    </motion.div>
  )
}
