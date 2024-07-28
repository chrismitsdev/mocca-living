'use client'

import * as React from 'react'
import {DayPicker} from 'react-day-picker'
import {buttonVariants} from '@/components/ui/button'
import {
  ChevronUpIcon, 
  ChevronRightIcon, 
  ChevronDownIcon, 
  ChevronLeftIcon
} from '@radix-ui/react-icons'
import {cn} from '#/lib/utils'

const chevronMap = {
  up: <ChevronUpIcon width={18} height={18} />,
  right: <ChevronRightIcon width={18} height={18} />,
  down: <ChevronDownIcon width={18} height={18} />,
  left: <ChevronLeftIcon width={18} height={18} />,
}

type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar(
  {
    className, 
    classNames, 
    showOutsideDays = true, 
    weekStartsOn = 1, 
    disabled = {before: new Date()},
    ...props
  }: CalendarProps
) {
  const btnVariant = buttonVariants({variant: 'bordered', size: 'icon-small'})
  const s = '[&:not([aria-selected]):not(:has(button[disabled]))]'

  return (
    <DayPicker
      className={cn('p-4', className)}
      classNames={{
        months: 'relative',
        nav: 'absolute top-0 right-0 flex items-center gap-2',
        month: 'space-y-4',                             // div (month-year wrapper & table)
        month_caption: 'py-1',                          // div (month-year wrapper)
        caption_label: 'block font-semibold',           // div > span (month-year)
        button_previous: btnVariant,                    // nav button previous
        button_next: btnVariant,                        // nav button next
        // weekdays: '',                                // table > thead > tr element
        weekday: 'p-0 h-10 w-10 font-semibold',         // table > thead > tr > th element
        // weeks: '',                                   // table > tbody
        // week: '',                                    // table > tbody > tr
        day: `p-0 transition rounded ${s}:hover:text-app-background ${s}:hover:bg-border`, // table > tbody > tr > td
        day_button: 'h-10 w-10',                        // table > tbody > tr > td > button element
        today: 'font-semibold',                         // table > tbody > tr > td (that matches today)
        selected: 'bg-primary text-primary-foreground', // table > tbody > tr > td (that is selected)
        range_start: 'rounded-r-none',
        range_middle: '!bg-border rounded-none',
        range_end: 'rounded-l-none',
        outside: 'text-foreground-muted',               // table > tbody > tr > td
        hidden: 'invisible',                            // table > tbody > tr > td[aria-hidden="true"]
        disabled: 'opacity-30',
        ...classNames,
      }}
      components={{
        Chevron: ({orientation}) => chevronMap[orientation || 'right'],
      }}
      weekStartsOn={weekStartsOn}
      showOutsideDays={showOutsideDays}
      disabled={disabled}
      {...props}
    />
  )
}

Calendar.displayName = 'Calendar'

export {Calendar}