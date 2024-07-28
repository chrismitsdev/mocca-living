'use client'

import * as React from 'react'
import {CalendarIcon} from '@radix-ui/react-icons'
import {Button} from '@/components/ui/button'
import {Calendar} from '@/components/ui/calendar'
import {Popover, PopoverTrigger, PopoverContent} from '@/components/ui/popover'
import {formatDate} from '#/lib/utils'

function DatePicker({locale}: {locale: Params['params']['locale']}) {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className='w-full bg-app-background justify-start data-open:border-border-hover'
          variant='bordered'
        >
          <CalendarIcon width={16} height={16} />
          <span>
            {date ? formatDate(date, locale) : 'Pick a date'}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className='w-[var(--radix-popover-trigger-width)] sm:w-auto'
        align='start' 
      >
        <Calendar
          calendarLocale={locale}
          mode='single'
          selected={date}
          onSelect={setDate}
        />
      </PopoverContent>
    </Popover>
  )
}

DatePicker.displayName = 'DatePicker'

export {DatePicker}