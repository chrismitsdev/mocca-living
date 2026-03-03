'use client'

import {LayoutRouterContext} from 'next/dist/shared/lib/app-router-context.shared-runtime'
import {use, useState} from 'react'

function FrozenRouter({children}: React.PropsWithChildren) {
  const context = use(LayoutRouterContext)
  const [frozen] = useState(() => context)

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  )
}

FrozenRouter.displayName = 'FrozenRouter'

export {FrozenRouter}
