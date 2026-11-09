'use client'

import {IconChevronDown} from '@tabler/icons-react'
import {Badge} from '@/src/components/ui/badge'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/src/components/ui/collapsible'
import {Typography} from '@/src/components/ui/typography'
import {BookingActions} from './booking-actions'
import type {BookingRow} from './booking-row'

/** Mobile view: one collapsible per booking */
function BookingsList({rows}: {rows: BookingRow[]}) {
  return (
    <ul className='space-y-4 lg:hidden'>
      {rows.map((row) => (
        <li key={row.reservationNumber}>
          <Collapsible className='bg-surface-2 border border-surface-3 group'>
            <CollapsibleTrigger className='p-4 inline-full grid grid-cols-[1fr_auto] gap-2 text-left'>
              <span className='font-semibold'>{row.bookerName}</span>
              <IconChevronDown
                className='transition group-data-open:rotate-180'
                aria-hidden
              />
              <Typography
                className='col-span-2 font-mono'
                variant='small'
              >
                {row.reservationNumber}
              </Typography>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className='p-4 space-y-4 border-t border-surface-3'>
                <dl className='grid grid-cols-[auto_1fr] gap-4 text-sm'>
                  <dt className='font-bold'>Ονοματεπώνυμο</dt>
                  <dd>{row.bookerName}</dd>
                  <dt className='font-bold'>Αριθμός κράτησης</dt>
                  <dd>{row.reservationNumber}</dd>
                  <dt className='font-bold'>Κατάλυμα</dt>
                  <dd>{row.property}</dd>
                  <dt className='font-bold'>Διαμονή</dt>
                  <dd className='whitespace-nowrap'>
                    {row.checkIn} – {row.checkOut}
                  </dd>
                  <dt className='font-bold'>Λήξη</dt>
                  <dd>
                    {row.accessEnds}
                    {row.extended && ' (παράταση)'}
                  </dd>
                  <dt className='font-bold'>Άτομα</dt>
                  <dd>{row.guestCount}</dd>
                  <dt className='font-bold'>Προέλευση</dt>
                  <dd>{row.channel}</dd>
                  <dt className='font-bold'>Πρόσβαση</dt>
                  <dd>
                    <Badge
                      variant={row.statusVariant}
                      size='small'
                    >
                      {row.statusLabel}
                    </Badge>
                  </dd>
                  <dt className='font-bold'>Ενέργειες</dt>
                  <dd>
                    <BookingActions row={row} />
                  </dd>
                </dl>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </li>
      ))}
    </ul>
  )
}

export {BookingsList}
