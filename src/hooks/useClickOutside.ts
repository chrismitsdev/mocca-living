import * as React from 'react'

export function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void
): void {
  React.useEffect(
    function () {
      const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        if (
          !ref ||
          !ref.current ||
          ref.current.contains(event.target as Node)
        ) {
          return
        }

        handler(event)
      }

      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)

      return function () {
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('touchstart', handleClickOutside)
      }
    },
    [ref, handler]
  )
}
