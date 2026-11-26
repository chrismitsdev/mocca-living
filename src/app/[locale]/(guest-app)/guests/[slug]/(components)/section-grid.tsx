import {useTranslations} from 'next-intl'
import {Section} from '@/src/components/shared/section'
import {Typography} from '@/src/components/ui/typography'
import {Link} from '@/src/i18n/navigation'
import {devicesOf} from '@/src/lib/guest-app/content/devices'
import {GUEST_SECTIONS} from '@/src/lib/guest-app/content/sections'
import type {GuestAppProperty} from '@/src/lib/guest-app/properties'

function SectionGrid({slug}: {slug: GuestAppProperty}) {
  const t = useTranslations('Pages.guest-app.sections')
  // A property without device guides gets no devices tile
  const visible = GUEST_SECTIONS.filter(
    ({id}) => id !== 'devices' || devicesOf(slug).length > 0
  )

  return (
    <Section className='pt-8 sm:pt-12'>
      <ul className='grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4'>
        {visible.map(({id, icon: Icon}) => (
          <li key={id}>
            <Link
              className='h-full p-4 flex flex-col items-center justify-center gap-2 text-center bg-surface-2 border border-surface-3 hover:bg-surface-3 sm:p-6'
              href={`/guests/${slug}/${id}`}
            >
              <Icon
                className='size-8'
                aria-hidden
              />
              <Typography variant='large'>{t(`${id}.title`)}</Typography>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export {SectionGrid}
