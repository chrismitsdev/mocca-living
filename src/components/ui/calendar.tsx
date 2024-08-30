'use client'

import * as React from 'react'
import {DayPicker} from 'react-day-picker'
import {el, enUS} from 'date-fns/locale'
import {buttonVariants} from '@/components/ui/button'
import {
  ChevronUpIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronLeftIcon
} from 'lucide-react'
import {cn} from '#/lib/utils'

const chevronMap = {
  up: <ChevronUpIcon size={18} />,
  right: <ChevronRightIcon size={18} />,
  down: <ChevronDownIcon size={18} />,
  left: <ChevronLeftIcon size={18} />
}

type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  calendarLocale?: Params['params']['locale']
}

function Calendar({
  className,
  classNames,
  weekStartsOn = 1,
  showOutsideDays = true,
  disabled = {before: new Date()},
  calendarLocale,
  ...props
}: CalendarProps) {
  const btnVariant = buttonVariants({variant: 'bordered', size: 'icon-small'})

  return (
    <DayPicker
      className={cn('mx-auto w-fit', className)}
      classNames={{
        months: 'relative',
        nav: 'absolute top-0 right-0 flex items-center gap-2',
        month: 'space-y-4', // div (month-year wrapper & table)
        month_caption: 'py-1', // div (month-year wrapper)
        caption_label: 'block font-semibold', // div > span (month-year)
        button_previous: btnVariant, // nav button previous
        button_next: btnVariant, // nav button next
        month_grid: 'border-collapse', // table
        // weekdays: '',                                // table > thead > tr element
        weekday: 'p-0 h-10 w-10 font-semibold', // table > thead > tr > th element
        // weeks: '',                                   // table > tbody
        // week: '',                                    // table > tbody > tr
        day: `p-0 transition rounded [&:not([aria-selected]):not(:has(button[disabled]))]:hover:text-surface-1 [&:not([aria-selected]):not(:has(button[disabled]))]:hover:bg-border`, // table > tbody > tr > td
        day_button: 'h-10 w-10', // table > tbody > tr > td > button element
        today: 'font-semibold', // table > tbody > tr > td (that matches today)
        selected: 'bg-primary text-primary-foreground', // table > tbody > tr > td (that is selected)
        range_start: 'rounded-r-none', // table > tbody > tr > td (when mode = 'range')
        range_middle: 'rounded-none', // table > tbody > tr > td (when mode = 'range')
        range_end: 'rounded-l-none', // table > tbody > tr > td (when mode = 'range')
        // outside: '[&:not(:has(button[disabled]))]:text-primary', // table > tbody > tr > td
        // outside: '[&:not(:has(button[disabled]))]:text-primary', // table > tbody > tr > td
        outside: 'text-primary', // table > tbody > tr > td
        hidden: 'invisible', // table > tbody > tr > td[aria-hidden="true"]
        disabled:
          'opacity-50 bg-striped !text-inherit font-bold [&>button]:cursor-not-allowed',
        ...classNames
      }}
      components={{
        Chevron: ({orientation}) => chevronMap[orientation || 'right']
      }}
      weekStartsOn={weekStartsOn}
      showOutsideDays={showOutsideDays}
      disabled={disabled}
      locale={calendarLocale === 'gr' ? el : enUS}
      {...props}
    />
  )
}

Calendar.displayName = 'Calendar'

export {Calendar}
