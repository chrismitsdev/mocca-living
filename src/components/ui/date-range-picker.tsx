'use client'

import * as React from 'react'
import {CalendarIcon} from '@radix-ui/react-icons'
import {type DateRange} from 'react-day-picker'
import {Button} from '@/components/ui/button'
import {Calendar} from '@/components/ui/calendar'
import {Popover, PopoverTrigger, PopoverPortal, PopoverContent} from '@/components/ui/popover'
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
          className='px-3 w-full bg-app-background justify-start data-open:border-border-hover'
          variant='bordered'
        >
          <CalendarIcon className='shrink-0' width={16} height={16} />
          {date?.from 
            ? (
              <span>
                {date.to 
                  ? `${formatDate(date.from, locale, 'PP')} - ${formatDate(date.to, locale, 'PP')}`
                  : formatDate(date.from, locale, 'PP')
                }
              </span>
            ) 
            : <span>{'Pick a date'}</span>
          }
        </Button>
      </PopoverTrigger>
      <PopoverPortal>
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
      </PopoverPortal>
    </Popover>
  )
}

DateRangePicker.displayName = 'DateRangePicker'

export {DateRangePicker}