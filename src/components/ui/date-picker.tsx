'use client'

import * as React from 'react'
import {type Matcher} from 'react-day-picker'
import {CalendarIcon} from 'lucide-react'
import {type LucideProps} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Calendar} from '@/components/ui/calendar'
import {Popover, PopoverTrigger, PopoverPortal, PopoverContent} from '@/components/ui/popover'
import {formatDate} from '#/lib/utils'

type DatePickerProps = {
  id?: string
  locale: Params['params']['locale']
  placeholder?: string
  disabled?: boolean
  calendarDisabled?: Matcher | Matcher[]
  icon?: React.ComponentType<LucideProps>
  date?: Date
  onDateChange?: React.Dispatch<React.SetStateAction<Date | undefined>>
}

function DatePicker({
  id,
  locale,
  placeholder,
  disabled,
  calendarDisabled,
  icon,
  date,
  onDateChange
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  function handleDateSelect(date: Date | undefined) {
    if (!date) return
    onDateChange?.(date)
    setOpen(false)
  }

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger
        id={id}
        disabled={disabled}
        asChild
      >
        <Button
          className='px-3 w-full bg-surface-1 justify-start data-open:border-border-hover data-open:shadow focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-border-hover focus-visible:shadow'
          variant='bordered'
        >
          {!icon ? (
            <CalendarIcon
              className='shrink-0'
              size={16}
            />
          ) : (
            React.createElement(icon, {className: 'shrink-0', width: 16, height: 16})
          )}
          {!date && placeholder && (
            <span className='text-sm font-normal text-foreground-muted'>{placeholder}</span>
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
            disabled={calendarDisabled}
          />
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  )
}

DatePicker.displayName = 'DatePicker'

export {DatePicker}
