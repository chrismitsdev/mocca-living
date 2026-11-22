import {IconCircleCheck} from '@tabler/icons-react'
import {useFormatter, useTranslations} from 'next-intl'
import {Section} from '@/src/components/shared/section'
import {Card, CardContent} from '@/src/components/ui/card'
import {Typography} from '@/src/components/ui/typography'
import {PROPERTY_TIMEZONE} from '@/src/lib/guest-app/properties'
import {
  accessEndsAt,
  type Reservation
} from '@/src/lib/guest-app/store/reservations'

const items = ['item-1', 'item-2', 'item-3', 'item-4'] as const

// The deadline is when guest access ends: check-out time on the departure
// day, or the end of an extension set in the admin
function CheckOutDetails({reservation}: {reservation: Reservation}) {
  const t = useTranslations('Pages.guest-app.check-out')
  const format = useFormatter()
  const deadline = format.dateTime(new Date(accessEndsAt(reservation)), {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZone: PROPERTY_TIMEZONE
  })

  return (
    <Section className='pt-8 sm:pt-12'>
      <div className='space-y-8'>
        <Card>
          <CardContent>
            <Typography
              className='text-surface-5'
              variant='small'
            >
              {t('deadline')}
            </Typography>
            <Typography variant='h4'>{deadline}</Typography>
          </CardContent>
        </Card>
        <div className='space-y-4'>
          <Typography
            variant='h4'
            as='h2'
          >
            {t('checklist')}
          </Typography>
          <ul className='space-y-3'>
            {items.map((item) => (
              <li
                className='flex gap-3'
                key={item}
              >
                <IconCircleCheck
                  className='shrink-0 h-8'
                  aria-hidden
                />
                <Typography>{t(item)}</Typography>
              </li>
            ))}
          </ul>
        </div>
        <Typography serif>{t('thanks')}</Typography>
      </div>
    </Section>
  )
}

export {CheckOutDetails}
