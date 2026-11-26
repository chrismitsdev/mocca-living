'use client'

import {IconExternalLink} from '@tabler/icons-react'
import {useFormatter, useNow, useTranslations} from 'next-intl'
import {useEffect, useState} from 'react'
import {Section} from '@/src/components/shared/section'
import {Badge} from '@/src/components/ui/badge'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/src/components/ui/tabs'
import {Typography} from '@/src/components/ui/typography'
import type {
  BorderDirection,
  BorderWaits as BorderWaitsData,
  CrossingWait,
  WaitLevel
} from '@/src/lib/guest-app/border'
import {PROPERTY_TIMEZONE} from '@/src/lib/guest-app/properties'

// The guest's last choice of border, kept on their device
const STORAGE_KEY = 'guest-app:border-direction'
const DIRECTIONS: BorderDirection[] = ['turkey', 'bulgaria']

const LEVEL_BADGE: Record<WaitLevel, 'success' | 'primary' | 'error'> = {
  low: 'success',
  medium: 'primary',
  high: 'error'
}

type BorderWaitsProps = {
  waits: Record<BorderDirection, BorderWaitsData>
  defaultDirection: BorderDirection
}

function BorderWaits({waits, defaultDirection}: BorderWaitsProps) {
  const t = useTranslations('Pages.guest-app.border')
  const [direction, setDirection] = useState(defaultDirection)

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'turkey' || saved === 'bulgaria') setDirection(saved)
  }, [])

  function choose(next: string) {
    if (next !== 'turkey' && next !== 'bulgaria') return
    setDirection(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }

  return (
    <Section className='pt-8 sm:pt-12'>
      <div className='space-y-6'>
        <Tabs
          className='space-y-6'
          value={direction}
          onValueChange={choose}
        >
          <TabsList aria-label={t('tabs-label')}>
            {DIRECTIONS.map((option) => (
              <TabsTrigger
                key={option}
                value={option}
              >
                {t(`tab-${option}`)}
              </TabsTrigger>
            ))}
          </TabsList>
          {DIRECTIONS.map((option) => (
            <TabsContent
              key={option}
              className='space-y-6'
              value={option}
            >
              {!waits[option].ok && <Typography>{t('unavailable')}</Typography>}
              <ul className='bg-surface-2 border border-surface-3 divide-y divide-surface-3'>
                {waits[option].crossings.map((crossing) => (
                  <Crossing
                    key={crossing.id}
                    crossing={crossing}
                  />
                ))}
              </ul>
            </TabsContent>
          ))}
        </Tabs>
        <div className='space-y-2'>
          <Typography
            className='text-surface-5'
            variant='small'
          >
            {t('disclaimer')}
          </Typography>
          {/* Required attribution: a visible, followed link */}
          <a
            className='inline-block text-sm underline focus-ring'
            href='https://nakordoni.eu'
            target='_blank'
            rel='noopener'
          >
            Data by nakordoni.eu
          </a>
        </div>
      </div>
    </Section>
  )
}

function Crossing({crossing}: {crossing: CrossingWait}) {
  const t = useTranslations('Pages.guest-app.border')
  const {reading} = crossing

  return (
    <li className='px-4 py-3 space-y-1 sm:px-6'>
      <div className='flex items-start justify-between gap-4'>
        <div className='min-w-0 space-y-1'>
          <Typography>{t(`crossings.${crossing.id}`)}</Typography>
          {reading?.detailsUrl && (
            <a
              className='inline-flex items-center gap-1 text-sm underline focus-ring'
              href={reading.detailsUrl}
              target='_blank'
              rel='noopener'
            >
              {t('details')}
              <IconExternalLink
                className='size-4'
                aria-hidden
              />
            </a>
          )}
        </div>
        {reading && (
          <div className='shrink-0 flex flex-col items-end gap-1'>
            <Typography variant='h4'>
              {t('minutes', {minutes: reading.minutes})}
            </Typography>
            {reading.level && (
              <Badge
                variant={LEVEL_BADGE[reading.level]}
                size='small'
              >
                {t(`level.${reading.level}`)}
              </Badge>
            )}
          </div>
        )}
      </div>
      <Typography
        className='text-surface-5'
        variant='small'
      >
        {reading ? (
          // Every value carries its age and source (nakordoni terms)
          <>
            {t('estimate')} · <ReadingAge updatedAt={reading.updatedAt} /> ·
            nakordoni.eu
          </>
        ) : (
          t('no-reading')
        )}
      </Typography>
    </li>
  )
}

/**
 * How long ago a reading was taken ("31 minutes ago"), refreshed every
 * minute; the exact time is in the tooltip. Server and browser can disagree
 * by a minute when the page loads, hence suppressHydrationWarning
 */
function ReadingAge({updatedAt}: {updatedAt: string}) {
  const t = useTranslations('Pages.guest-app.border')
  const format = useFormatter()
  const now = useNow({updateInterval: 60_000})
  const updated = new Date(updatedAt)
  const minutes = Math.floor((now.getTime() - updated.getTime()) / 60_000)

  return (
    <time
      dateTime={updatedAt}
      title={format.dateTime(updated, {
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
        timeZone: PROPERTY_TIMEZONE
      })}
      suppressHydrationWarning
    >
      {minutes < 1
        ? t('just-now')
        : format.relativeTime(updated, {now, unit: 'minute'})}
    </time>
  )
}

export {BorderWaits}
