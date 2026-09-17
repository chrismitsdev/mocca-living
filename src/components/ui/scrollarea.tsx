'use client'

import {ScrollArea as RadixScrollArea} from 'radix-ui'
import {Fragment} from 'react'
import {cn} from '@/src/lib/utils'

type ScrollAreaProps = React.ComponentPropsWithRef<
  typeof RadixScrollArea.Root
> & {
  orientation?: 'vertical' | 'horizontal' | 'both'
  showScrollbar?: boolean
}

function ScrollArea({
  className,
  orientation = 'vertical',
  showScrollbar = true,
  type = 'always',
  children,
  ...props
}: ScrollAreaProps) {
  return (
    <RadixScrollArea.Root
      className={cn('overflow-hidden', className)}
      type={type}
      {...props}
    >
      <RadixScrollArea.Viewport className='size-full'>
        {children}
      </RadixScrollArea.Viewport>
      {orientation !== 'both' ? (
        <Scrollbar
          orientation={orientation}
          showScrollbar={showScrollbar}
        />
      ) : (
        <Fragment>
          <Scrollbar
            orientation='vertical'
            showScrollbar={showScrollbar}
          />
          <Scrollbar
            orientation='horizontal'
            showScrollbar={showScrollbar}
          />
          <RadixScrollArea.Corner />
        </Fragment>
      )}
    </RadixScrollArea.Root>
  )
}

function Scrollbar({
  className,
  orientation,
  showScrollbar,
  ...props
}: Omit<
  React.ComponentPropsWithRef<typeof RadixScrollArea.Scrollbar>,
  'children'
> & {
  showScrollbar?: boolean
}) {
  return (
    <RadixScrollArea.Scrollbar
      className={cn(
        'p-0.5 flex touch-none select-none transition-colors',
        showScrollbar ? 'visible' : 'invisible',
        orientation === 'vertical' && 'block-full inline-2.5',
        orientation === 'horizontal' && 'flex-col block-2.5',
        className
      )}
      orientation={orientation}
      {...props}
    >
      <RadixScrollArea.Thumb className='flex-1 bg-surface-4 rounded-full hover:bg-surface-5' />
    </RadixScrollArea.Scrollbar>
  )
}

export {ScrollArea}
