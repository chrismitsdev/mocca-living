'use client'

import {IconCalendar} from '@tabler/icons-react'
import {useState} from 'react'
import type {DateRange, Locale} from 'react-day-picker'
import {Calendar} from '@/src/components/ui/calendar'
import {
  Popup,
  PopupContent,
  PopupPortal,
  PopupTrigger
} from '@/src/components/ui/popup'
import {cn} from '@/src/lib/utils'

// A start/end date field: a button showing the range, a two-month calendar in
// a popup, and two hidden inputs that submit the dates as YYYY-MM-DD. Dates
// are calendar days, built and read in local time, so they never shift by a
// day through UTC

/** "YYYY-MM-DD" → a local Date at midnight */
function parseDay(value: string | undefined): Date | undefined {
  const match = value?.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!match) return undefined
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
}

/** A local Date → "YYYY-MM-DD" */
function formatDay(date: Date | undefined): string {
  if (!date) return ''
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

type DateRangePickerProps = {
  id?: string
  /** Names of the submitted start and end inputs */
  startName: string
  endName: string
  /** Initial "YYYY-MM-DD" values */
  defaultStart?: string
  defaultEnd?: string
  placeholder: string
  /** Calendar language (month and day names, date format) */
  locale?: Locale
  /** Minimum number of nights between start and end */
  minNights?: number
  error?: boolean
  disabled?: boolean
  className?: string
  'aria-describedby'?: string
}

function DateRangePicker({
  id,
  startName,
  endName,
  defaultStart,
  defaultEnd,
  placeholder,
  locale,
  minNights = 1,
  error,
  disabled,
  className,
  'aria-describedby': ariaDescribedBy
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false)
  const [range, setRange] = useState<DateRange | undefined>(() => {
    const from = parseDay(defaultStart)
    return from ? {from, to: parseDay(defaultEnd)} : undefined
  })

  const dateFormat = new Intl.DateTimeFormat(locale?.code, {
    dateStyle: 'medium'
  })
  const complete = Boolean(range?.from && range.to && range.to > range.from)
  const label = range?.from
    ? `${dateFormat.format(range.from)} – ${
        range.to && complete ? dateFormat.format(range.to) : '…'
      }`
    : placeholder

  function handleSelect(next: DateRange | undefined) {
    setRange(next)
    // Close once both ends are picked
    if (next?.from && next.to && next.to > next.from) setOpen(false)
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
            'relative py-3.75 pl-9 pr-4 inline-full flex items-center bg-surface-3 border border-transparent text-left font-bold outline-0 transition cursor-pointer focus:border-surface-4 focus-visible:border-surface-4 disabled:pointer-events-none disabled:opacity-35',
            range?.from && 'border-surface-4',
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
          {/* An empty field shows its placeholder like an Input does */}
          <span
            className={cn(
              !range?.from &&
                'text-sm leading-6 text-[color-mix(in_oklab,currentcolor_50%,transparent)]'
            )}
          >
            {label}
          </span>
        </button>
      </PopupTrigger>
      {/* Portalled, so a parent dialog's scroll area can't clip it */}
      <PopupPortal>
        <PopupContent
          className='p-4'
          align='start'
        >
          <Calendar
            mode='range'
            numberOfMonths={2}
            locale={locale}
            min={minNights}
            resetOnSelect
            selected={range}
            onSelect={handleSelect}
            defaultMonth={range?.from ?? new Date()}
            autoFocus
          />
        </PopupContent>
      </PopupPortal>
      {/* Submitted only once the range is complete */}
      <input
        type='hidden'
        name={startName}
        value={complete ? formatDay(range?.from) : ''}
      />
      <input
        type='hidden'
        name={endName}
        value={complete ? formatDay(range?.to) : ''}
      />
    </Popup>
  )
}

export {DateRangePicker}
