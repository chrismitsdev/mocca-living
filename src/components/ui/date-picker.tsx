'use client'

import * as React from 'react'
import {enUS, el} from 'date-fns/locale'
import {format} from 'date-fns'
import {CalendarIcon} from '@radix-ui/react-icons'
import {Button} from '@/components/ui/button'
import {Calendar} from '@/components/ui/calendar'
import {Popover, PopoverTrigger, PopoverPortal, PopoverContent} from '@/components/ui/popover'

type DatePickerProps = {
  locale: Params['params']['locale']
}

function DatePicker({locale}: DatePickerProps) {
  const [date, setDate] = React.useState<Date>()
  const dateFnsLocale = locale === 'en' ? enUS : el

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className='w-full bg-app-background justify-start data-open:border-border-hover'
          variant='bordered'
        >
          <CalendarIcon width={16} height={16} />
          <span>
            {date ? format(date, 'PPP', {locale: dateFnsLocale}) : 'Pick a date'}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent align='start' className='p-0 w-auto overflow-auto'>
          <Calendar
            locale={locale === 'en' ? enUS : el}
            mode='single'
            selected={date}
            onSelect={setDate}
          />
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  )
}

DatePicker.displayName = 'DatePicker'

export {DatePicker}