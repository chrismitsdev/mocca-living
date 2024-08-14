import * as React from 'react'
import {useMotionValue, useScroll, useTransform} from 'framer-motion'

export function useBoundedScroll(bounds: number) {
  const {scrollY} = useScroll()
  const scrollYBounded = useMotionValue(0)
  const scrollYBoundedProgress = useTransform(scrollYBounded, [0, bounds], [0, 1])

  React.useEffect(
    function () {
      return scrollY.on('change', (currScrollY) => {
        scrollYBounded.set(currScrollY < 0 ? 0 : currScrollY)
      })
    },
    [bounds, scrollY, scrollYBounded]
  )

  return {scrollYBounded, scrollYBoundedProgress}
}
