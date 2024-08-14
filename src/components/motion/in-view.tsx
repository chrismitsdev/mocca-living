'use client'

import * as React from 'react'
import {motion, useInView, Variant, Transition, UseInViewOptions} from 'framer-motion'

interface InViewProps {
  variants?: {
    hidden: Variant
    visible: Variant
  }
  transition?: Transition
  viewOptions?: UseInViewOptions
  children: React.ReactNode
}

const defaultVariants = {
  hidden: {opacity: 0},
  visible: {opacity: 1}
}

export function InView({
  variants = defaultVariants,
  transition,
  viewOptions,
  children
}: InViewProps) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, viewOptions)

  return (
    <motion.div
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={transition}
      ref={ref}
    >
      {children}
    </motion.div>
  )
}
