'use client'

import {IconCalendar} from '@tabler/icons-react'
import {useState} from 'react'
import type {Locale} from 'react-day-picker'
import {Calendar} from '@/src/components/ui/calendar'
import {
  dateTriggerClassName,
  formatDay,
  parseDay
} from '@/src/components/ui/date-range-picker'
import {
  Popup,
  PopupContent,
  PopupPortal,
  PopupTrigger
} from '@/src/components/ui/popup'
import {cn} from '@/src/lib/utils'

// A single date field: a button showing the date, a calendar in a popup, and
// a hidden input that submits it as YYYY-MM-DD. It always holds a date

type DatePickerProps = {
  id?: string
  name: string
  /** Initial "YYYY-MM-DD" value */
  defaultValue: string
  /** Earliest "YYYY-MM-DD" that can be picked */
  minDate?: string
  /** Calendar language (month and day names, date format) */
  locale?: Locale
  error?: boolean
  disabled?: boolean
  className?: string
  'aria-describedby'?: string
}

function DatePicker({
  id,
  name,
  defaultValue,
  minDate,
  locale,
  error,
  disabled,
  className,
  'aria-describedby': ariaDescribedBy
}: DatePickerProps) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(() => parseDay(defaultValue))
  const earliest = parseDay(minDate)

  const dateFormat = new Intl.DateTimeFormat(locale?.code, {
    dateStyle: 'medium'
  })

  function handleSelect(next: Date) {
    setSelected(next)
    setOpen(false)
  }

  return (
    <Popup
      open={open}
      onOpenChange={setOpen}
    >
      <PopupTrigger asChild>
        <button
          id={id}
          type='button'
          className={cn(
            dateTriggerClassName,
            'border-surface-4',
            error && 'border-danger focus:border-danger',
            className
          )}
          aria-invalid={error || undefined}
          aria-describedby={ariaDescribedBy}
          disabled={disabled}
        >
          <IconCalendar
            className='absolute inset-s-2.5 size-5'
            aria-hidden
          />
          <span>{selected && dateFormat.format(selected)}</span>
        </button>
      </PopupTrigger>
      {/* Portalled, so a parent dialog's scroll area can't clip it */}
      <PopupPortal>
        <PopupContent
          className='p-4'
          align='start'
        >
          <Calendar
            mode='single'
            required
            locale={locale}
            selected={selected}
            onSelect={handleSelect}
            disabled={earliest && {before: earliest}}
            defaultMonth={selected ?? new Date()}
            autoFocus
          />
        </PopupContent>
      </PopupPortal>
      <input
        type='hidden'
        name={name}
        value={formatDay(selected)}
      />
    </Popup>
  )
}

export {DatePicker}
