'use client'

import * as React from 'react'
import {type Matcher} from 'react-day-picker'
import {type LucideProps} from 'lucide-react'
import {cn, formatDate} from '@/src/lib/utils'
import {Button} from '@/src/components/ui/button'
import {Calendar} from '@/src/components/ui/calendar'
import {
  Popover,
  PopoverTrigger,
  PopoverPortal,
  PopoverContent
} from '@/src/components/ui/popover'

type DatePickerProps = {
  id?: string
  locale: Awaited<Params['params']>['locale']
  placeholder?: string
  disabled?: boolean
  disabledDates?: Matcher | Matcher[]
  icon?: React.ComponentType<LucideProps>
  date?: Date
  onDateChange?: React.Dispatch<React.SetStateAction<Date | undefined>>
}

const DatePicker: React.FC<DatePickerProps> = ({
  id,
  locale,
  placeholder,
  disabled,
  disabledDates,
  icon,
  date,
  onDateChange
}) => {
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
      modal
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
          {icon && (
            <span className={cn('shrink-0', disabled && 'opacity-35')}>
              {React.createElement(icon, {width: 16, height: 16})}
            </span>
          )}
          {!date && placeholder && (
            <span className='text-sm font-normal text-foreground-muted'>
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
            disabled={disabledDates}
          />
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  )
}

DatePicker.displayName = 'DatePicker'

export {DatePicker}
