'use client'

import {Children, cloneElement, isValidElement} from 'react'
import {Checkbox} from '@/src/components/ui/checkbox'
import {Input} from '@/src/components/ui/input'
import {Label} from '@/src/components/ui/label'
import {Textarea} from '@/src/components/ui/textarea'
import {Typography} from '@/src/components/ui/typography'
import {cn} from '@/src/lib/utils'

function FormControl({
  id,
  className,
  error,
  children,
  ...props
}: Omit<React.ComponentPropsWithRef<'div'>, 'id'> & {
  id: string
  error?: string
}) {
  const errorId = error ? `${id}-error` : undefined

  const renderedChildren = Children.map(children, (child) => {
    if (!isValidElement(child)) return child

    if (child.type === Label) {
      return cloneElement(
        child as React.ReactElement<React.ComponentProps<typeof Label>>,
        {
          className: 'mb-1'
        }
      )
    }

    if (
      child.type === Input ||
      child.type === Textarea ||
      child.type === Checkbox
    ) {
      return cloneElement(
        child as React.ReactElement<React.HTMLAttributes<HTMLElement>>,
        {
          'aria-invalid': !!error || undefined,
          'aria-describedby': errorId
        }
      )
    }

    return child
  })

  return (
    <div
      className={cn('relative flex flex-col', className)}
      {...props}
    >
      {renderedChildren}
      <div
        aria-hidden={!error}
        className={cn(
          'px-2 py-1 min-block-6',
          error && 'bg-danger text-danger-foreground'
        )}
      >
        {error && (
          <Typography
            id={errorId}
            variant='tiny'
            role='alert'
          >
            {error}
          </Typography>
        )}
      </div>
    </div>
  )
}

export {FormControl}
