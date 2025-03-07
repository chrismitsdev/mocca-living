import * as React from 'react'
import {useMotionValue, useScroll, useTransform} from 'framer-motion'
import {clamp} from '@/src/lib/utils'

export function useBoundedScrollDiff(bounds: number) {
  const {scrollY} = useScroll()
  const scrollYBounded = useMotionValue(0)
  const scrollYBoundedProgress = useTransform(
    scrollYBounded,
    [0, bounds],
    [0, 1]
  )

  React.useEffect(
    function () {
      return scrollY.on('change', (currScrollY) => {
        const prevScrollY = scrollY.getPrevious()
        const diff = currScrollY - (prevScrollY || 0)
        const newScrollYBounded = scrollYBounded.get() + diff

        scrollYBounded.set(clamp(newScrollYBounded, 0, bounds))
      })
    },
    [bounds, scrollY, scrollYBounded]
  )

  return {scrollYBounded, scrollYBoundedProgress}
}
