'use client'

import * as React from 'react'
import {
  motion,
  useInView,
  Variant,
  Transition,
  UseInViewOptions
} from 'framer-motion'

interface InViewProps {
  viewOptions?: UseInViewOptions
  variants?: {
    hidden: Variant
    visible: Variant
  }
  transition?: Transition
  className?: string
  children: React.ReactNode
}

const defaultVariants = {
  hidden: {opacity: 0},
  visible: {opacity: 1}
}

export function InView({
  viewOptions,
  variants = defaultVariants,
  ...props
}: InViewProps) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, viewOptions)

  return (
    <motion.div
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      ref={ref}
      {...props}
    />
  )
}
