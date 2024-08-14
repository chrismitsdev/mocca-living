import * as React from 'react'

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = React.useState(0)

  React.useEffect(function () {
    if (typeof window === 'undefined') return

    function updateScrollPosition() {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener('scroll', updateScrollPosition)

    return function () {
      window.removeEventListener('scroll', updateScrollPosition)
    }
  }, [])

  return scrollPosition
}
