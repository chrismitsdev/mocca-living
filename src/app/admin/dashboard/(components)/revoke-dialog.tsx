'use client'

import {IconBan} from '@tabler/icons-react'
import {useActionState, useId, useState} from 'react'
import {Button} from '@/src/components/ui/button'
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
import {
  type AdminFormState,
  revokeReservationAction
} from '@/src/lib/guest-app/admin/actions'
import {useResultToast} from '../../(components)/use-result-toast'
import type {BookingRow} from './booking-row'

type RevokeDialogProps = Pick<
  BookingRow,
  'reservationNumber' | 'bookerName' | 'canRevoke'
>

/** Revoke button with a confirmation step: revoking can't be undone */
function RevokeDialog({
  reservationNumber,
  bookerName,
  canRevoke
}: RevokeDialogProps) {
  const descriptionId = useId()
  const [open, setOpen] = useState(false)
  const initialState: AdminFormState<{reservationNumber: string}> = {
    data: {reservationNumber},
    errors: {},
    ok: null
  }
  const [state, action, isPending] = useActionState(
    revokeReservationAction,
    initialState
  )
  // Close on success (the row then shows "Ανακλήθηκε"). On failure the toast
  // explains and the dialog stays open, so a temporary error can be retried
  useResultToast(state, () => setOpen(false))

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => !isPending && setOpen(next)}
    >
      <DialogTrigger asChild>
        <IconButton
          aria-label={`Ανάκληση πρόσβασης για ${reservationNumber}`}
          title='Ανάκληση πρόσβασης'
          variant='secondary'
          size='small'
          disabled={!canRevoke}
        >
          <IconBan aria-hidden />
        </IconButton>
      </DialogTrigger>
      <DialogContent
        className='sm:max-inline-lg'
        aria-describedby={descriptionId}
      >
        <DialogHeader>
          <DialogTitle>Ανάκληση πρόσβασης</DialogTitle>
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
            <p>
              Ο/Η <strong>{bookerName}</strong> (κράτηση{' '}
              <strong>{reservationNumber}</strong>) δεν θα μπορεί πλέον να
              χρησιμοποιήσει την εφαρμογή επισκεπτών.
            </p>
            <p>
              Η ανάκληση δεν αναιρείται, και μεταγενέστερα email της κράτησης
              αγνοούνται.
            </p>
          </div>
          <form
            className='flex flex-wrap justify-end gap-2'
            action={action}
          >
            <input
              type='hidden'
              name='reservationNumber'
              value={reservationNumber}
            />
            <Button
              type='button'
              variant='secondary'
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Άκυρο
            </Button>
            <Button
              type='submit'
              isLoading={isPending}
            >
              Ανάκληση
              <IconBan aria-hidden />
            </Button>
          </form>
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}

export {RevokeDialog}
