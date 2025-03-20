import {type Locale} from 'next-intl'
import {DayPicker} from 'react-day-picker'
import {el, enUS} from 'react-day-picker/locale'
import {ChevronLeftIcon, ChevronRightIcon} from 'lucide-react'

type CalendarProps = React.ComponentPropsWithoutRef<typeof DayPicker> & {
  calendarLocale?: Locale
}

const Calendar: React.FC<CalendarProps> = ({
  classNames,
  calendarLocale,
  ...props
}) => {
  return (
    <DayPicker
      classNames={{
        // root div
        root: 'p-2 w-max space-y-2',
        // div > div (direct child div that nests nav and div)
        months: 'relative',
        // div > div > nav (nav element with navigation buttons)
        nav: 'absolute top-0 inset-x-0 inline-flex justify-between',
        // div > div > nav > button
        button_previous:
          'size-10 grid place-content-center rounded hover:bg-surface-3 active:bg-surface-3 sm:size-11',
        // div > div > nav > button
        button_next:
          'size-10 grid place-content-center rounded hover:bg-surface-3 active:bg-surface-3 sm:size-11',
        // div > div > div
        // month: 'text-red-10',
        // div > div > div > div
        month_caption: 'h-10 flex items-center justify-center sm:h-11',
        // div > div > div > div > span (month & year)
        caption_label: 'inline-block leading-6 font-semibold',
        // table
        // month_grid: '',
        // table > thead > tr
        weekdays: 'border-b border-b-surface-3',
        // table > thead > tr > th
        weekday: 'h-10 font-normal text-sm',
        // table > tbody
        weeks:
          'before:[content:"-"] before:block before:leading-[8px] before:text-transparent',
        // table > tbody > tr > td (current day)
        today: 'font-semibold',
        // table > tbody > tr > td
        day: 'size-10 rounded [&.range-start.range-end]:!rounded [&:not([aria-selected]):not([data-outside="true"]):not(:has(button[disabled]))]:hover:bg-surface-2 sm:size-11',
        selected:
          'font-semibold transition rounded [&:not([data-outside="true"])]:bg-surface-3',
        day_button: 'w-full h-full', // td > button element
        range_start: 'range-start rounded-r-none', // Start range day
        range_middle: 'rounded-none', // Middle range day
        range_end: 'range-end rounded-l-none', // End range day
        outside: 'text-muted',
        disabled: 'text-muted cursor-not-allowed',
        footer: 'flex items-center justify-between',
        ...classNames
      }}
      components={{
        Chevron: ({orientation}) => {
          return orientation === 'left' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )
        }
      }}
      locale={calendarLocale === 'gr' ? el : enUS}
      {...props}
    />
  )
}

Calendar.displayName = 'Calendar'

export {Calendar}
