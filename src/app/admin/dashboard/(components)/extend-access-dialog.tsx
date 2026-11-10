'use client'

import {IconCalendar, IconCalendarPlus, IconClock} from '@tabler/icons-react'
import {useActionState, useId, useState} from 'react'
import {el} from 'react-day-picker/locale'
import {FormControl} from '@/src/components/shared/form-control'
import {Button} from '@/src/components/ui/button'
import {DatePicker} from '@/src/components/ui/date-picker'
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/src/components/ui/dialog'
import {IconButton} from '@/src/components/ui/icon-button'
import {Input} from '@/src/components/ui/input'
import {Label} from '@/src/components/ui/label'
import {Typography} from '@/src/components/ui/typography'
import {SM_UP, useMediaQuery} from '@/src/hooks/use-media-query'
import {useResultToast} from '@/src/hooks/use-result-toast'
import {
  type AdminFormState,
  extendAccessAction
} from '@/src/lib/guest-app/admin/actions'
import type {BookingRow} from './booking-row'

type ExtendAccessDialogProps = Pick<
  BookingRow,
  | 'reservationNumber'
  | 'bookerName'
  | 'accessEnds'
  | 'accessEndsDate'
  | 'accessEndsTime'
  | 'canExtend'
>

/** Keep a guest's access open until a later date and time (late checkout) */
function ExtendAccessDialog({
  reservationNumber,
  bookerName,
  accessEnds,
  accessEndsDate,
  accessEndsTime,
  canExtend
}: ExtendAccessDialogProps) {
  const descriptionId = useId()
  const [open, setOpen] = useState(false)
  const initialState: AdminFormState<{
    reservationNumber: string
    accessUntilDate: string
    accessUntilTime: string
  }> = {
    data: {
      reservationNumber,
      accessUntilDate: accessEndsDate,
      accessUntilTime: accessEndsTime
    },
    errors: {},
    ok: null
  }
  const [state, action, isPending] = useActionState(
    extendAccessAction,
    initialState
  )
  useResultToast(state, () => handleOpenChange(false))
  const [shownState, setShownState] = useState(state)
  const [fieldsKey, setFieldsKey] = useState(0)
  const [cleared, setCleared] = useState(true)
  if (state !== shownState) {
    setShownState(state)
    setFieldsKey((key) => key + 1)
    setCleared(false)
  }

  const {data, errors} = cleared ? initialState : state

  function handleOpenChange(next: boolean) {
    if (isPending) return
    setOpen(next)
    if (!next) {
      setCleared(true)
      setFieldsKey((key) => key + 1)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
    >
      <DialogTrigger asChild>
        <IconButton
          aria-label={`Παράταση πρόσβασης για ${reservationNumber}`}
          title='Παράταση πρόσβασης'
          variant='secondary'
          size='small'
          disabled={!canExtend}
        >
          <IconCalendarPlus aria-hidden />
        </IconButton>
      </DialogTrigger>
      <DialogContent aria-describedby={descriptionId}>
        <DialogHeader>
          <DialogTitle>Παράταση πρόσβασης</DialogTitle>
          <DialogClose
            aria-label='Κλείσιμο'
            disabled={isPending}
          />
        </DialogHeader>
        <DialogBody className='space-y-6'>
          <div
            id={descriptionId}
            className='space-y-2'
          >
            <Typography as='p'>
              Ο/Η <strong>{bookerName}</strong> (κράτηση{' '}
              <strong>{reservationNumber}</strong>) θα έχει πρόσβαση στην
              εφαρμογή επισκεπτών μέχρι τη νέα ημερομηνία και ώρα (ώρα Ελλάδας).
            </Typography>
            <Typography as='p'>
              Τρέχουσα λήξη: <strong>{accessEnds}</strong>
            </Typography>
          </div>

          <form
            key={fieldsKey}
            action={action}
            noValidate
          >
            <input
              type='hidden'
              name='reservationNumber'
              value={reservationNumber}
            />
            <div className='space-y-4'>
              <AccessUntilDateField
                defaultValue={data.accessUntilDate}
                minDate={accessEndsDate}
                error={errors.accessUntilDate}
                disabled={isPending}
              />
              <FormControl
                id='accessUntilTime'
                error={errors.accessUntilTime}
              >
                <Label htmlFor='accessUntilTime'>Ώρα λήξης</Label>
                <Input
                  id='accessUntilTime'
                  name='accessUntilTime'
                  type='time'
                  defaultValue={data.accessUntilTime}
                  icon={IconClock}
                  error={Boolean(errors.accessUntilTime)}
                  disabled={isPending}
                />
              </FormControl>
              <div className='pt-10 flex flex-wrap justify-end gap-2'>
                <Button
                  type='button'
                  variant='secondary'
                  onClick={() => handleOpenChange(false)}
                  disabled={isPending}
                >
                  Άκυρο
                </Button>
                <Button
                  type='submit'
                  isLoading={isPending}
                >
                  Παράταση
                  <IconCalendarPlus aria-hidden />
                </Button>
              </div>
            </div>
          </form>
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}

/** A calendar from the sm breakpoint up, the OS date picker on narrower screens */
function AccessUntilDateField({
  defaultValue,
  minDate,
  error,
  disabled
}: {
  defaultValue: string
  minDate: string
  error?: string
  disabled?: boolean
}) {
  const wide = useMediaQuery(SM_UP)

  return (
    <FormControl
      id='accessUntilDate'
      error={error}
    >
      <Label htmlFor='accessUntilDate'>Ημερομηνία λήξης</Label>
      {wide ? (
        <DatePicker
          id='accessUntilDate'
          name='accessUntilDate'
          defaultValue={defaultValue || minDate}
          minDate={minDate}
          locale={el}
          error={Boolean(error)}
          aria-describedby={error ? 'accessUntilDate-error' : undefined}
          disabled={disabled}
        />
      ) : (
        <Input
          id='accessUntilDate'
          name='accessUntilDate'
          type='date'
          min={minDate}
          defaultValue={defaultValue}
          icon={IconCalendar}
          error={Boolean(error)}
          disabled={disabled}
        />
      )}
    </FormControl>
  )
}

export {ExtendAccessDialog}
