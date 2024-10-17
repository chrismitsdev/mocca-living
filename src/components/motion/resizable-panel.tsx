'use client'

import * as React from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import useMeasure from 'react-use-measure'

const ResizablePanelContext = React.createContext({value: ''})

function ResizablePanel({
  value,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  value: string
}) {
  const [ref, bounds] = useMeasure()

  return (
    <motion.div
      animate={{height: bounds.height > 0 ? bounds.height : undefined}}
      transition={{type: 'spring', bounce: 0, duration: 0.8}}
      style={{overflow: 'hidden', position: 'relative'}}
    >
      <div ref={ref}>
        <ResizablePanelContext.Provider value={{value}}>
          <div {...props}>{children}</div>
        </ResizablePanelContext.Provider>
      </div>
    </motion.div>
  )
}

function ResizablePanelContent({
  value,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  value: string
}) {
  const panelContext = React.useContext(ResizablePanelContext)
  const isActive = panelContext.value === value

  return (
    <AnimatePresence
      mode='popLayout'
      initial={false}
    >
      {isActive && (
        <motion.div
          initial={{opacity: 0}}
          animate={{
            opacity: 1,
            transition: {
              type: 'ease',
              ease: 'easeInOut',
              duration: 0.3,
              delay: 0.2
            }
          }}
          exit={{
            opacity: 0,
            transition: {
              type: 'ease',
              ease: 'easeInOut',
              duration: 0.2
            }
          }}
        >
          <div {...props}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

ResizablePanel.displayName = 'ResizablePanel'
ResizablePanelContent.displayName = 'ResizablePanelContent'

export {ResizablePanel, ResizablePanelContent}
