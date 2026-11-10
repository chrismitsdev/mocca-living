import type {BookingRow} from './booking-row'
import {ExtendAccessDialog} from './extend-access-dialog'
import {RevokeAccessDialog} from './revoke-access-dialog'

function BookingActions({row}: {row: BookingRow}) {
  return (
    <div className='flex gap-2'>
      <ExtendAccessDialog
        reservationNumber={row.reservationNumber}
        bookerName={row.bookerName}
        accessEnds={row.accessEnds}
        accessEndsDate={row.accessEndsDate}
        accessEndsTime={row.accessEndsTime}
        canExtend={row.canExtend}
      />
      <RevokeAccessDialog
        reservationNumber={row.reservationNumber}
        bookerName={row.bookerName}
        canRevoke={row.canRevoke}
      />
    </div>
  )
}

export {BookingActions}
