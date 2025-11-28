'use client'

import {LayoutRouterContext} from 'next/dist/shared/lib/app-router-context.shared-runtime'
import * as React from 'react'

const FrozenRouter: React.FC<React.PropsWithChildren> = ({children}) => {
  const context = React.use(LayoutRouterContext)
  const [frozen] = React.useState(() => context)

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  )
}

FrozenRouter.displayName = 'FrozenRouter'

export {FrozenRouter}

// 'use client'

// import * as React from 'react'
// import {LayoutRouterContext} from 'next/dist/shared/lib/app-router-context.shared-runtime'

// const FrozenRouter: React.FC<React.PropsWithChildren> = ({children}) => {
//   const context = React.use(LayoutRouterContext)
//   const frozen = React.useRef(context).current

//   return (
//     <LayoutRouterContext.Provider value={frozen}>
//       {children}
//     </LayoutRouterContext.Provider>
//   )
// }

// FrozenRouter.displayName = 'FrozenRouter'

// export {FrozenRouter}
