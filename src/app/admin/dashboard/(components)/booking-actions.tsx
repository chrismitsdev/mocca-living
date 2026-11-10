import {IconCalendarPlus} from '@tabler/icons-react'
import {IconButton} from '@/src/components/ui/icon-button'
import type {BookingRow} from './booking-row'
import {RevokeAccessDialog} from './revoke-access-dialog'

function BookingActions({row}: {row: BookingRow}) {
  return (
    <div className='flex gap-2'>
      {/* Placeholder: extend is wired up in a later step */}
      <IconButton
        aria-label={`Παράταση πρόσβασης για ${row.reservationNumber}`}
        title='Παράταση πρόσβασης'
        variant='secondary'
        size='small'
        disabled={!row.canExtend}
      >
        <IconCalendarPlus aria-hidden />
      </IconButton>
      <RevokeAccessDialog
        reservationNumber={row.reservationNumber}
        bookerName={row.bookerName}
        canRevoke={row.canRevoke}
      />
    </div>
  )
}

export {BookingActions}
