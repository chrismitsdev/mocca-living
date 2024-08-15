import * as React from 'react'
import {useMotionValue, useScroll, useTransform} from 'framer-motion'

export function useBoundedScroll(bounds: number) {
  const {scrollY} = useScroll()
  const scrollYValue = useMotionValue(0)
  const scrollYBoundedProgress = useTransform(scrollYValue, [0, bounds], [0, 1])

  React.useEffect(
    function () {
      return scrollY.on('change', (currScrollY) => {
        scrollYValue.set(currScrollY)
      })
    },
    [bounds, scrollY, scrollYValue]
  )

  return {scrollYValue, scrollYBoundedProgress}
}
