'use client'

import * as React from 'react'
import {AnimatePresence, Transition, motion} from 'framer-motion'
import {cn} from '#/lib/utils'

type AnimatedBackgroundProps = {
  children:
    | React.ReactElement<{'data-id': string}>[]
    | React.ReactElement<{'data-id': string}>
  defaultValue?: string
  onValueChange?: (newActiveId: string | null) => void
  className?: string
  transition?: Transition
  enableHover?: boolean
}

function AnimatedBackground({
  children,
  defaultValue,
  onValueChange,
  className,
  transition,
  enableHover = false
}: AnimatedBackgroundProps) {
  const [activeId, setActiveId] = React.useState<string | null>(null)
  const uniqueId = React.useId()

  const handleSetActiveId = (id: string | null) => {
    setActiveId(id)

    if (onValueChange) {
      onValueChange(id)
    }
  }

  React.useEffect(() => {
    if (defaultValue !== undefined) {
      setActiveId(defaultValue)
    }
  }, [defaultValue])

  return React.Children.map(children, (child: JSX.Element, index) => {
    const id = child.props['data-id']

    const interactionProps = enableHover
      ? {
          onMouseEnter: () => handleSetActiveId(id),
          onMouseLeave: () => handleSetActiveId(null)
        }
      : {
          onClick: () => handleSetActiveId(id)
        }

    return React.cloneElement(
      child,
      {
        key: index,
        className: cn('relative flex', child.props.className),
        'aria-selected': activeId === id,
        'data-checked': activeId === id ? 'true' : 'false',
        ...interactionProps
      },
      <>
        <AnimatePresence initial={false}>
          {activeId === id && (
            <motion.div
              className={cn('absolute inset-0', className)}
              layoutId={`background-${uniqueId}`}
              transition={transition}
              initial={{opacity: defaultValue ? 1 : 0}}
              animate={{
                opacity: 1
              }}
              exit={{
                opacity: 0
              }}
            />
          )}
        </AnimatePresence>
        <span className='z-10'>{child.props.children}</span>
      </>
    )
  })
}

AnimatedBackground.displayName = 'AnimatedBackground'

export {AnimatedBackground}
