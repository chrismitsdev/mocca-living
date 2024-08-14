'use client'

import {motion} from 'framer-motion'

export default function Template({children}: {children: Readonly<React.ReactNode>}) {
  return (
    <motion.section
      className='pb-32 space-y-28'
      initial={{y: -16, opacity: 0}}
      animate={{y: 0, opacity: 1}}
      transition={{ease: 'easeInOut', duration: 1}}
    >
      {children}
    </motion.section>
  )
}
