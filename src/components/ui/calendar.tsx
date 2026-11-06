'use client'

import {IconChevronLeft, IconChevronRight} from '@tabler/icons-react'
import {DayPicker} from 'react-day-picker'
import {cn} from '@/src/lib/utils'

// react-day-picker, unstyled, with the site's tokens. Weeks start on Monday

function CalendarChevron({
  orientation,
  className
}: {
  orientation?: 'up' | 'down' | 'left' | 'right'
  className?: string
}) {
  const Icon = orientation === 'left' ? IconChevronLeft : IconChevronRight
  return (
    <Icon
      className={cn('size-5', className)}
      aria-hidden
    />
  )
}

function Calendar({
  className,
  classNames,
  weekStartsOn = 1,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      className={cn('text-sm', className)}
      weekStartsOn={weekStartsOn}
      showOutsideDays={showOutsideDays}
      classNames={{
        months: 'relative flex flex-col gap-6 sm:flex-row',
        month: 'space-y-3',
        month_caption: 'flex block-9 items-center justify-center',
        caption_label: 'font-bold first-letter:uppercase',
        nav: 'absolute inset-x-0 inset-bs-0 z-10 flex justify-between',
        button_previous:
          'size-9 inline-flex items-center justify-center cursor-pointer focus-ring hover:bg-surface-3 disabled:opacity-30 disabled:pointer-events-none',
        button_next:
          'size-9 inline-flex items-center justify-center cursor-pointer focus-ring hover:bg-surface-3 disabled:opacity-30 disabled:pointer-events-none',
        month_grid: 'border-collapse',
        weekdays: '',
        weekday: 'size-10 text-xs font-normal',
        week: '',
        day: 'p-0 text-center',
        day_button:
          'size-10 inline-flex items-center justify-center cursor-pointer focus-ring hover:bg-surface-3',
        today: '[&>button]:underline [&>button]:underline-offset-4',
        selected:
          '[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:font-bold',
        // Nights between arrival and departure; overrides "selected"
        range_middle:
          '[&>button]:bg-surface-4! [&>button]:text-foreground! [&>button]:font-normal!',
        outside: 'opacity-40',
        disabled: 'opacity-30 [&>button]:pointer-events-none',
        hidden: 'invisible',
        ...classNames
      }}
      components={{Chevron: CalendarChevron}}
      {...props}
    />
  )
}

export {Calendar}
