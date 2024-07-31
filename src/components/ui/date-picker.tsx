'use client'

import * as React from 'react'
import {type Matcher} from 'react-day-picker'
import {CalendarIcon} from '@radix-ui/react-icons'
import {Button} from '@/components/ui/button'
import {Calendar} from '@/components/ui/calendar'
import {Popover, PopoverTrigger, PopoverPortal, PopoverContent} from '@/components/ui/popover'
import {formatDate} from '#/lib/utils'
import {IconProps} from '@radix-ui/react-icons/dist/types'

type DatePickerProps = {
  locale: Params['params']['locale']
  placeholder?: string
  disabled?: Matcher | Matcher[]
  icon?: React.ComponentType<IconProps>
  date?: Date
  onDateChange?: React.Dispatch<React.SetStateAction<Date | undefined>>
}

function DatePicker({locale, placeholder, disabled, icon, date, onDateChange}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  function handleDateSelect(date: Date | undefined) {
    if (!date) return
    onDateChange?.(date)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className='px-3 w-full bg-app-background justify-start data-open:border-border-hover data-open:shadow'
          variant='bordered'
        >
          {!icon 
            ? <CalendarIcon className='shrink-0' width={16} height={16} /> 
            : React.createElement(
              icon, 
              {className: 'shrink-0', width: 16, height: 16}
            )
          }
          {(!date && placeholder) && (
            <span className='font-normal text-foreground-muted'>
              {placeholder}
            </span>
          )}
          {date && <span>{formatDate(date, locale)}</span>}
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
            mode='single'
            selected={date}
            onSelect={handleDateSelect}
            disabled={disabled}
          />
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  )
}

DatePicker.displayName = 'DatePicker'

export {DatePicker}