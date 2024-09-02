'use client'

import * as React from 'react'
import {type DateRange} from 'react-day-picker'
import {type LucideProps} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Calendar} from '@/components/ui/calendar'
import {
  Popover,
  PopoverTrigger,
  PopoverPortal,
  PopoverContent
} from '@/components/ui/popover'
import {cn, formatDate} from '#/lib/utils'

type DateRangePickerProps = {
  locale: Params['params']['locale']
  id?: string
  placeholder?: string
  date?: DateRange
  onDateChange: React.Dispatch<React.SetStateAction<DateRange | undefined>>
  disabled?: boolean
  icon?: React.FunctionComponent<LucideProps>
}

function DateRangePicker({
  locale,
  id,
  placeholder,
  date,
  onDateChange,
  disabled,
  icon
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false)

  function handleDateRangeChange(date: DateRange | undefined) {
    onDateChange?.(date)

    // if (date?.from && date.to) {
    //   setOpen(false)
    // }
  }

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      modal
    >
      <PopoverTrigger
        id={id}
        disabled={disabled}
        asChild
      >
        <Button
          id='date'
          className='px-3 w-full bg-surface-1 justify-start data-open:border-border-hover data-open:shadow focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-border-hover focus-visible:shadow'
          variant='bordered'
        >
          {icon && (
            <span className={cn('shrink-0', disabled && 'opacity-35')}>
              {React.createElement(icon, {width: 16, height: 16})}
            </span>
          )}
          {date?.from ? (
            date.to ? (
              <span>
                <span>{formatDate(date.from, locale, 'PP')}</span>
                {' - '}
                <span>{formatDate(date.to, locale, 'PP')}</span>
              </span>
            ) : (
              <span>
                <span>{formatDate(date.from, locale, 'PP')}</span>
                {' - '}
              </span>
            )
          ) : (
            <span className='text-sm font-normal text-foreground-muted'>
              {placeholder}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent
          className='p-2 w-[var(--radix-popover-trigger-width)] sm:p-4 sm:w-auto'
          align='start'
        >
          <Calendar
            calendarLocale={locale}
            classNames={{month_grid: 'border-separate'}}
            mode='range'
            selected={date}
            onSelect={handleDateRangeChange}
            min={1}
          />
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  )
}

DateRangePicker.displayName = 'DateRangePicker'

export {DateRangePicker}
