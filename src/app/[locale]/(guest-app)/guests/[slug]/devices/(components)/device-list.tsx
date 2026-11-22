import {IconChevronRight} from '@tabler/icons-react'
import {useTranslations} from 'next-intl'
import {Section} from '@/src/components/shared/section'
import {Typography} from '@/src/components/ui/typography'
import {Link} from '@/src/i18n/navigation'
import type {DeviceTextKey} from '@/src/lib/guest-app/content/device-text'
import {devicesOf} from '@/src/lib/guest-app/content/devices'
import type {GuestAppProperty} from '@/src/lib/guest-app/properties'

function DeviceList({slug}: {slug: GuestAppProperty}) {
  const t = useTranslations('Pages.guest-app.device-guides')

  return (
    <Section className='pt-8 sm:pt-12'>
      <ul className='bg-surface-2 border border-surface-3 divide-y divide-surface-3'>
        {devicesOf(slug).map(({id, icon: Icon}) => (
          <li key={id}>
            <Link
              className='flex items-start gap-4 px-4 py-3 hover:bg-surface-3 sm:px-6'
              href={`/guests/${slug}/devices/${id}`}
            >
              <Icon
                className='shrink-0 h-8'
                aria-hidden
              />
              <div className='flex-1 min-w-0'>
                <Typography>
                  {t(`${slug}.${id}.name` as DeviceTextKey)}
                </Typography>
                <Typography
                  className='text-surface-5'
                  variant='small'
                >
                  {t(`${slug}.${id}.model` as DeviceTextKey)}
                </Typography>
              </div>
              <IconChevronRight
                className='shrink-0 h-8 text-surface-5'
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export {DeviceList}
