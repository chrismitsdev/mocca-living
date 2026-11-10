import {IconLogout} from '@tabler/icons-react'
import {notFound} from 'next/navigation'
import {Section} from '@/src/components/shared/section'
import {Button} from '@/src/components/ui/button'
import {Typography} from '@/src/components/ui/typography'
import {GUEST_APP_HIDDEN} from '@/src/lib/constants'
import {logoutAction} from '@/src/lib/guest-app/admin/actions'
import {requireAdmin} from '@/src/lib/guest-app/admin/admin-session'
import {listReservations} from '@/src/lib/guest-app/store/reservations'
import {createUpstashStore} from '@/src/lib/guest-app/store/upstash'
import {AddAccessDialog} from './(components)/add-access-dialog'
import {toBookingRows} from './(components)/booking-row'
import {BookingsList} from './(components)/bookings-list'
import {BookingsTable} from './(components)/bookings-table'

export default async function AdminDashboardPage() {
  if (GUEST_APP_HIDDEN) notFound()

  await requireAdmin()
  const now = Date.now()
  const reservations = await listReservations(
    createUpstashStore(),
    new Date(now)
  )
  const rows = toBookingRows(reservations, now)

  return (
    <Section>
      <div className='mb-10 flex flex-wrap items-end justify-between gap-4'>
        <Typography
          variant='h1'
          as='h1'
        >
          Πρόσβαση επισκεπτών
        </Typography>
        <div className='flex flex-wrap gap-2'>
          <AddAccessDialog />
          <form action={logoutAction}>
            <Button
              type='submit'
              variant='secondary'
            >
              Αποσύνδεση
              <IconLogout aria-hidden />
            </Button>
          </form>
        </div>
      </div>

      {rows.length ? (
        <>
          <BookingsTable rows={rows} />
          <BookingsList rows={rows} />
        </>
      ) : (
        <Typography>Δεν υπάρχει ενεργή ή επερχόμενη πρόσβαση.</Typography>
      )}
    </Section>
  )
}
