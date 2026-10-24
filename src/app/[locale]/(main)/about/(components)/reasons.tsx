import {
  IconCrown,
  IconGlassChampagne,
  IconHeart,
  IconPlant2,
  type IconProps,
  IconUsersGroup
} from '@tabler/icons-react'
import {useTranslations} from 'next-intl'
import {Section} from '@/src/components/shared/section'
import {Typography} from '@/src/components/ui/typography'
import {cn} from '@/src/lib/utils'

const reasons = [
  {key: 'reason1', Icon: IconUsersGroup},
  {key: 'reason2', Icon: IconGlassChampagne},
  {key: 'reason3', Icon: IconCrown},
  {key: 'reason4', Icon: IconHeart},
  {key: 'reason5', Icon: IconPlant2}
] as const

function Reasons() {
  const t = useTranslations('Pages.about.reasons')

  return (
    <Section title={t('section-title')}>
      <div className='space-y-8 sm:space-y-6'>
        <Typography
          variant='display'
          serif
          asChild
        >
          <h2>{t('title')}</h2>
        </Typography>
        <ul className='grid gap-4 sm:grid-cols-6'>
          {reasons.map(({key, Icon}, index) => (
            <ReasonCard
              key={key}
              className={index < 3 ? 'sm:col-span-2' : 'sm:col-span-3'}
              icon={Icon}
              title={t(`${key}.title`)}
              description={t(`${key}.description`)}
            />
          ))}
        </ul>
      </div>
    </Section>
  )
}

function ReasonCard({
  className,
  icon: Icon,
  title,
  description
}: {
  className?: string
  icon: React.ComponentType<IconProps>
  title: string
  description: string
}) {
  return (
    <li
      className={cn(
        'p-6 flex gap-4 bg-surface-2 border border-surface-3 sm:p-8 sm:gap-6',
        className
      )}
    >
      <span className='p-4 rounded-full self-start bg-surface-3'>
        <Icon
          className='size-8'
          aria-hidden
        />
      </span>
      <div className='space-y-2'>
        <Typography
          variant='h4'
          serif
          asChild
        >
          <h3>{title}</h3>
        </Typography>
        <Typography>{description}</Typography>
      </div>
    </li>
  )
}

export {Reasons}
