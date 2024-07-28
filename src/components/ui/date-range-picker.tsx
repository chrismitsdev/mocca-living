'use client'

import * as React from 'react'
import {addDays, format} from 'date-fns'
import {CalendarIcon} from '@radix-ui/react-icons'
import {type DateRange} from 'react-day-picker'
import {Button} from '@/components/ui/button'
import {Calendar} from '@/components/ui/calendar'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'
import {cn} from '#/lib/utils'

function DateRangePicker() {
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
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, 'LLL dd, y')} {'-'}{' '}
                {format(date.to, 'LLL dd, y')}
              </>
            ) : format(date.from, 'LLL dd, y')
          ) : (
            <span>{'Pick a date'}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
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