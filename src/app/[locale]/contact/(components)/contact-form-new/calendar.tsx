import {useLocale} from 'next-intl'
import React from 'react'
import {DayPicker, type DateRange} from 'react-day-picker'
import {el, enUS} from 'react-day-picker/locale'

const Calendar: React.FC = () => {
  const [selected, setSelected] = React.useState<DateRange>()
  const locale = useLocale()

  return (
    <DayPicker
      selected={selected}
      onSelect={setSelected}
      locale={locale === 'gr' ? el : enUS}
      mode='range'
      weekStartsOn={1}
      fixedWeeks
      classNames={{
        // root div
        root: 'p-4 w-max',
        // div > div (direct child div that nests nav and div)
        months: 'relative',
        // div > div > nav (nav element with navigation buttons)
        nav: 'absolute top-0 inset-x-0 inline-flex justify-between',
        // div > div > nav > button
        button_previous:
          'w-11 h-11 grid place-content-center rounded hover:bg-surface-3 active:bg-surface-3',
        // div > div > nav > button
        button_next:
          'w-11 h-11 grid place-content-center rounded hover:bg-surface-3 active:bg-surface-3',
        // div with month span
        month: 'space-y-2',
        // div > div > div > div
        month_caption: 'h-11 flex items-center justify-center',
        // div > div > div > div > span (month & year)
        caption_label: 'inline-block leading-6 text-sm font-semibold',
        // table
        // month_grid: '',
        // table > thead > tr
        weekdays: 'border-b border-b-surface-3',
        // table > thead > tr > th
        weekday: 'w-10 h-10 font-normal text-sm',
        // table > tbody
        weeks:
          'before:[content:"-"] before:block before:leading-[8px] before:text-transparent',
        // table > tbody > tr > td (current day)
        today: 'font-semibold',
        day: 'w-11 h-11 rounded [&.range-start.range-end]:!rounded [&:not([aria-selected]):not([data-outside="true"]):not(:has(button[disabled]))]:hover:bg-surface-2',
        selected:
          'font-semibold transition rounded [&:not([data-outside="true"])]:bg-surface-3',
        day_button: 'w-11 h-11', // td > button element
        range_start: 'range-start rounded-r-none', // Start range day
        range_middle: 'rounded-none', // Middle range day
        range_end: 'range-end rounded-l-none', // End range day
        outside: 'text-muted',
        disabled: 'text-surface-4'
      }}
      disabled={{before: new Date()}}
      min={1}
      required
    />
  )
}

Calendar.displayName = 'Calendar'

export {Calendar}
