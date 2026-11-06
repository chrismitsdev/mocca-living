'use client'

import {useEffect, useRef} from 'react'
import {toast} from '@/src/components/ui/toast'

type ResultState = {ok: null} | {ok: boolean; title?: string; message: string}

/** One toast per action result, like the guest access form */
export function useResultToast(state: ResultState, onSuccess?: () => void) {
  // The last result already shown. Strict Mode runs effects twice on mount,
  // which would otherwise show a result from the initial state (e.g. the
  // expired-link notice on the login page) twice
  const shown = useRef<ResultState | null>(null)

  useEffect(() => {
    if (state.ok === null || shown.current === state) return
    shown.current = state

    toast({
      title: state.title ?? (state.ok ? 'Επιτυχία' : 'Σφάλμα'),
      description: state.message,
      status: state.ok ? 'success' : 'error'
    })
    if (state.ok) onSuccess?.()
  }, [state, onSuccess])
}
