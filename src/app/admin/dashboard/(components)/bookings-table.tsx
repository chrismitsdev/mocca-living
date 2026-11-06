import {Badge} from '@/src/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow
} from '@/src/components/ui/table'
import {BookingActions} from './booking-actions'
import type {BookingRow} from './booking-row'

/** Desktop view: one row per booking */
function BookingsTable({rows}: {rows: BookingRow[]}) {
  return (
    <TableContainer className='hidden lg:block'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ονοματεπώνυμο</TableHead>
            <TableHead>Αριθμός κράτησης</TableHead>
            <TableHead>Κατάλυμα</TableHead>
            <TableHead>Διαμονή</TableHead>
            <TableHead>Λήξη</TableHead>
            <TableHead>Άτομα</TableHead>
            <TableHead>Προέλευση</TableHead>
            <TableHead>Πρόσβαση</TableHead>
            <TableHead>Ενέργειες</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.reservationNumber}>
              <TableCell className='font-semibold'>{row.bookerName}</TableCell>
              <TableCell>{row.reservationNumber}</TableCell>
              <TableCell>{row.property}</TableCell>
              <TableCell className='whitespace-nowrap'>
                {row.checkIn} – {row.checkOut}
              </TableCell>
              <TableCell className='whitespace-nowrap'>
                {row.accessEnds}
                {row.extended && ' (παράταση)'}
              </TableCell>
              <TableCell>{row.pax}</TableCell>
              <TableCell>{row.channel}</TableCell>
              <TableCell>
                <Badge
                  variant={row.statusVariant}
                  size='small'
                >
                  {row.statusLabel}
                </Badge>
              </TableCell>
              <TableCell>
                <BookingActions row={row} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export {BookingsTable}
