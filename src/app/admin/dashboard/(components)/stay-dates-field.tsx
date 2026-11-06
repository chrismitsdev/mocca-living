'use client'

import {IconCalendar} from '@tabler/icons-react'
import {useSyncExternalStore} from 'react'
import {el} from 'react-day-picker/locale'
import {FormControl} from '@/src/components/shared/form-control'
import {DateRangePicker} from '@/src/components/ui/date-range-picker'
import {Input} from '@/src/components/ui/input'
import {Label} from '@/src/components/ui/label'

// Arrival and departure. With a mouse or trackpad: one range calendar. On
// touch screens: two native date inputs, so phones get the OS date picker.
// Either way the form submits checkIn and checkOut as YYYY-MM-DD

const FINE_POINTER = '(pointer: fine)'

function subscribe(onChange: () => void) {
  const query = window.matchMedia(FINE_POINTER)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

/**
 * Whether the main input is a mouse or trackpad. The field only renders in
 * an opened dialog, in the browser, so the server value is never shown
 */
function useFinePointer() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(FINE_POINTER).matches,
    () => true
  )
}

type StayDatesFieldProps = {
  defaultCheckIn: string
  defaultCheckOut: string
  errors: {checkIn?: string; checkOut?: string}
  disabled?: boolean
}

function StayDatesField({
  defaultCheckIn,
  defaultCheckOut,
  errors,
  disabled
}: StayDatesFieldProps) {
  const finePointer = useFinePointer()

  if (finePointer) {
    const error = errors.checkIn ?? errors.checkOut
    return (
      <FormControl
        className='sm:col-span-3'
        id='stay'
        error={error}
      >
        <Label htmlFor='stay'>Άφιξη – Αναχώρηση</Label>
        <DateRangePicker
          id='stay'
          startName='checkIn'
          endName='checkOut'
          defaultStart={defaultCheckIn}
          defaultEnd={defaultCheckOut}
          placeholder='Επιλέξτε ημερομηνίες'
          locale={el}
          error={Boolean(error)}
          aria-describedby={error ? 'stay-error' : undefined}
          disabled={disabled}
        />
      </FormControl>
    )
  }

  return (
    <div className='grid gap-x-4 sm:grid-cols-2 sm:col-span-3'>
      <FormControl
        id='checkIn'
        error={errors.checkIn}
      >
        <Label htmlFor='checkIn'>Άφιξη</Label>
        <Input
          id='checkIn'
          name='checkIn'
          type='date'
          defaultValue={defaultCheckIn}
          icon={IconCalendar}
          error={Boolean(errors.checkIn)}
          disabled={disabled}
        />
      </FormControl>
      <FormControl
        id='checkOut'
        error={errors.checkOut}
      >
        <Label htmlFor='checkOut'>Αναχώρηση</Label>
        <Input
          id='checkOut'
          name='checkOut'
          type='date'
          defaultValue={defaultCheckOut}
          icon={IconCalendar}
          error={Boolean(errors.checkOut)}
          disabled={disabled}
        />
      </FormControl>
    </div>
  )
}

export {StayDatesField}
