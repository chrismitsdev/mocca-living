import {useTranslations} from 'next-intl'
import {Section} from '@/src/components/shared/section'
import {Card, CardContent} from '@/src/components/ui/card'
import {Typography} from '@/src/components/ui/typography'

// Greek emergency numbers
const numbers = [
  {id: 'general', number: '112'},
  {id: 'police', number: '100'},
  {id: 'fire', number: '199'},
  {id: 'ambulance', number: '166'},
  {id: 'coast-guard', number: '108'}
] as const

function EmergencyDetails() {
  const t = useTranslations('Pages.guest-app.emergency')

  return (
    <Section className='pt-8 sm:pt-12'>
      <div className='space-y-4'>
        <Typography
          variant='h4'
          as='h2'
        >
          {t('numbers')}
        </Typography>
        <Card>
          <CardContent className='p-0 sm:p-0'>
            <ul className='divide-y divide-surface-3'>
              {numbers.map(({id, number}) => (
                <li key={id}>
                  <a
                    className='flex items-center justify-between gap-4 px-4 py-3 hover:bg-surface-3 focus-ring sm:px-6'
                    href={`tel:${number}`}
                  >
                    <Typography>{t(id)}</Typography>
                    <Typography variant='h4'>{number}</Typography>
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Typography
          className='text-surface-5'
          variant='small'
        >
          {t('note')}
        </Typography>
      </div>
    </Section>
  )
}

export {EmergencyDetails}
