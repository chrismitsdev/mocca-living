import * as React from 'react'

export function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void
): void {
  React.useEffect(
    function () {
      function handleClickOutside(event: MouseEvent | TouchEvent): void {
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
