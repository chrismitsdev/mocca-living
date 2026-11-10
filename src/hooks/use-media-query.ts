'use client'

import {useCallback, useSyncExternalStore} from 'react'

/** Tailwind's `sm` breakpoint */
export const SM_UP = '(min-width: 40rem)'

/**
 * Whether a media query matches, updated as it changes. The server answer is
 * true, so only use it in the content of an opened dialog, in the browser,
 * where the server value is never shown
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query)
      list.addEventListener('change', onChange)
      return () => list.removeEventListener('change', onChange)
    },
    [query]
  )

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => true
  )
}
