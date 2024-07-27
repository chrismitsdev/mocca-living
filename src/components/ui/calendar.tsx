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
    ...props
  }: CalendarProps
) {
  return (
    <DayPicker
      className={cn('p-4 w-fit bg-app-background', className)}
      weekStartsOn={weekStartsOn}
      classNames={{
        months: 'relative w-fit',
        nav: 'absolute top-0 right-0 flex items-center gap-2',
        month: 'space-y-4',
        month_caption: 'py-1',
        caption_label: 'block font-semibold',
        button_previous: buttonVariants({variant: 'bordered', size: 'icon-small'}),
        button_next: buttonVariants({variant: 'bordered', size: 'icon-small'}),
        // weekdays: '',                             // table > thead > tr element
        weekday: 'p-0 h-10 w-10 font-semibold',      // table > thead > tr > th element
        // weeks: '',                                // table > tbody
        // week: '',                                 // table > tbody > tr
        day: 'p-0 transition rounded [&:not([aria-selected])]:hover:text-app-background [&:not([aria-selected])]:hover:bg-border',                           // table > tbody > tr > td
        day_button: 'h-10 w-10',                     // table > tbody > tr > td > button element
        outside: 'text-foreground-muted',
        today: 'font-bold',
        selected: 'bg-primary text-primary-foreground',
        ...classNames,
      }}
      components={{
        Chevron: ({orientation = 'right'}) => chevronMap[orientation]
      }}
      showOutsideDays={showOutsideDays}
      {...props}
    />
  )
}

Calendar.displayName = 'Calendar'

export {Calendar}
