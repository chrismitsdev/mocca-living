'use client'

import * as React from 'react'
import {useLocale} from 'next-intl'
import {DateRange} from 'react-day-picker'
import {CalendarIcon} from 'lucide-react'
import {
  Popover,
  PopoverTrigger,
  PopoverPortal,
  PopoverContent
} from '@/src/components/ui/popover'
import {formatDate} from '@/src/lib/utils'
import {Calendar} from '@/src/app/[locale]/contact/(components)/contact-form-new/calendar'
import {Button} from '@/src/components/ui/button'

interface PopoverCalendarProps {
  id?: string
  name?: string
  placeholder?: string
  calendarProps?: React.ComponentPropsWithoutRef<typeof Calendar>
}

const PopoverCalendar: React.FC<PopoverCalendarProps> = ({
  id,
  name,
  placeholder,
  calendarProps
}) => {
  const [date, setDate] = React.useState<DateRange>({
    from: undefined,
    to: undefined
  })
  const locale = useLocale()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className='pl-3 w-full justify-start'
          id={id}
          name={name}
          variant='bordered-alt'
        >
          <CalendarIcon size={16} />
          {date?.from ? (
            date.to ? (
              <>
                {formatDate(date.from, locale)} - {formatDate(date.to, locale)}
              </>
            ) : (
              formatDate(date.from, locale)
            )
          ) : (
            <span className='text-sm font-normal text-foreground-muted'>
              {placeholder}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent align='start'>
          <Calendar
            autoFocus
            mode='range'
            selected={date}
            onSelect={setDate}
            required
            disabled={{before: new Date()}}
          />
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  )
}

PopoverCalendar.displayName = 'PopoverCalendar'

export {PopoverCalendar}
