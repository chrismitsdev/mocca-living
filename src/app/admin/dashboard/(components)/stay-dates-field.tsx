'use client'

import {IconCalendar} from '@tabler/icons-react'
import {el} from 'react-day-picker/locale'
import {FormControl} from '@/src/components/shared/form-control'
import {DateRangePicker} from '@/src/components/ui/date-range-picker'
import {Input} from '@/src/components/ui/input'
import {Label} from '@/src/components/ui/label'
import {SM_UP, useMediaQuery} from '@/src/hooks/use-media-query'

// Arrival and departure. From the sm breakpoint up: one range calendar.
// Narrower screens: two native date inputs, so phones get the OS date picker.
// Either way the form submits checkIn and checkOut as YYYY-MM-DD

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
  const wide = useMediaQuery(SM_UP)

  if (wide) {
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
