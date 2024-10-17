'use client'

import {motion} from 'framer-motion'
import useMeasure from 'react-use-measure'

function Resizable({
  className,
  children
}: {
  className?: string
  children: React.ReactNode
}) {
  const [ref, bounds] = useMeasure()

  return (
    <motion.div
      className={className}
      animate={{height: bounds.height > 0 ? bounds.height : 0}}
    >
      <div ref={ref}>{children}</div>
    </motion.div>
  )
}

Resizable.displayName = 'Resizable'

export {Resizable}
