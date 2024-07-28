'use client'

import * as React from 'react'
import {CalendarIcon} from '@radix-ui/react-icons'
import {type DateRange} from 'react-day-picker'
import {Button} from '@/components/ui/button'
import {Calendar} from '@/components/ui/calendar'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'
import {formatDate} from '#/lib/utils'

function DateRangePicker({locale}: {locale: Params['params']['locale']}) {
  const [date, setDate] = React.useState<DateRange>({
    from: undefined
  })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id='date'
          className='w-full bg-app-background justify-start data-open:border-border-hover'
          variant='bordered'
        >
          <CalendarIcon width={16} height={16} />
          {date?.from 
            ? (
              <span>
                {date.to 
                  ? `${formatDate(date.from, locale)} - ${formatDate(date.to, locale)}`
                  : formatDate(date.from, locale)
                }
              </span>
            ) 
            : <span>{'Pick a date'}</span>
          }
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className='w-[var(--radix-popover-trigger-width)] sm:w-auto' 
        align='start'
      >
        <Calendar
          calendarLocale={locale}
          mode='range'
          selected={date}
          onSelect={setDate}
          numberOfMonths={1}
          required
        />
      </PopoverContent>
    </Popover>
  )
}

DateRangePicker.displayName = 'DateRangePicker'

export {DateRangePicker}