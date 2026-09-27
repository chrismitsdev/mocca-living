'use client'

import {LayoutRouterContext} from 'next/dist/shared/lib/app-router-context.shared-runtime'
import {useContext, useState} from 'react'
import {IS_PRODUCTION} from '@/src/lib/utils'

function FrozenRouter({children}: React.PropsWithChildren) {
  const context = useContext(LayoutRouterContext)
  const [frozen] = useState(() => context)

  return (
    <LayoutRouterContext.Provider value={IS_PRODUCTION ? frozen : context}>
      {children}
    </LayoutRouterContext.Provider>
  )
}

export {FrozenRouter}
