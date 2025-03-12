'use client'

import * as React from 'react'
import {LayoutRouterContext} from 'next/dist/shared/lib/app-router-context.shared-runtime'
import {AnimatePresence, motion} from 'framer-motion'
import {usePathname} from '@/src/i18n/navigation'

const FrozenRouter: React.FC<React.PropsWithChildren> = ({children}) => {
  const context = React.use(LayoutRouterContext)
  const frozen = React.useRef(context).current

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  )
}

const RouteTransition: React.FC<React.PropsWithChildren> = ({children}) => {
  const pathname = usePathname()

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={pathname}
        className='space-y-32'
        initial={{opacity: 0, translateY: -24}}
        animate={{opacity: 1, translateY: 0}}
        exit={{opacity: 0, translateY: -24}}
        transition={{duration: 0.5, type: 'tween'}}
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  )
}

FrozenRouter.displayName = 'FrozenRouter'
RouteTransition.displayName = 'RouteTransition'

export {RouteTransition}

// 'use client'

// import * as React from 'react'
// import {LayoutRouterContext} from 'next/dist/shared/lib/app-router-context.shared-runtime'
// import {
//   AnimatePresence,
//   motion,
//   type Variant,
//   type Variants
// } from 'framer-motion'
// import {usePathname} from '@/src/i18n/navigation'

// const FrozenRouter: React.FC<React.PropsWithChildren> = ({children}) => {
//   const context = React.use(LayoutRouterContext)
//   const frozen = React.useRef(context).current

//   return (
//     <LayoutRouterContext.Provider value={frozen}>
//       {children}
//     </LayoutRouterContext.Provider>
//   )
// }

// const RouteTransition: React.FC<React.PropsWithChildren> = ({children}) => {
//   const pathname = usePathname()

//   function anim(variants: Variants) {
//     return {
//       initial: 'initial',
//       animate: 'enter',
//       exit: 'exit',
//       variants
//     }
//   }

//   const opacity = {
//     initial: {
//       opacity: 0
//     },
//     enter: {
//       opacity: 1
//     },
//     exit: {
//       opacity: 1
//     }
//   }

//   const slide = {
//     initial: {
//       top: '100vh'
//     },
//     enter: {
//       top: '100vh'
//     },
//     exit: {
//       top: '0',
//       transition: {
//         duration: 1,
//         ease: [0.76, 0, 0.24, 1]
//       }
//     }
//   }

//   return (
//     <AnimatePresence mode='wait'>
//       <div id='inner'>
//         <motion.div
//           id='slide'
//           className='fixed top-0 left-0 w-screen h-screen bg-red-9'
//           {...anim(slide)}
//         />
//         <motion.div
//           key={pathname}
//           className='space-y-32'
//           {...anim(opacity)}
//         >
//           <FrozenRouter>{children}</FrozenRouter>
//         </motion.div>
//       </div>
//     </AnimatePresence>
//   )
// }

// FrozenRouter.displayName = 'FrozenRouter'
// RouteTransition.displayName = 'RouteTransition'

// export {RouteTransition}
