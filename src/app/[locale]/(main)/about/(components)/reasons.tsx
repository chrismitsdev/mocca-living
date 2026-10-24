import {
  IconCrown,
  IconGlassChampagne,
  IconHeart,
  IconPlant2,
  type IconProps,
  IconUsersGroup
} from '@tabler/icons-react'
import {Section} from '@/src/components/shared/section'
import {Typography} from '@/src/components/ui/typography'
import {cn} from '@/src/lib/utils'

const reasons = [
  {
    Icon: IconUsersGroup,
    title: 'Families',
    description:
      'Spacious and fully equipped accommodations, ideal for families who want to enjoy quality time together in a comfortable and safe environment.'
  },
  {
    Icon: IconGlassChampagne,
    title: 'Friends',
    description:
      'The perfect base for friends to share unforgettable moments, with stylish spaces and easy access to beaches, restaurants and the vibrant local life.'
  },
  {
    Icon: IconCrown,
    title: 'VIP Guests',
    description:
      'Privacy, refined design and personalized attention for guests who expect a more exclusive and elevated experience.'
  },
  {
    Icon: IconHeart,
    title: 'Couples',
    description:
      'A romantic and serene setting for couples looking to escape, relax and create lasting memories by the sea or in the city.'
  },
  {
    Icon: IconPlant2,
    title: 'Wellness & Relaxation',
    description:
      "Whether it's a short break or a longer stay, Mocca Living offers a peaceful atmosphere and comfortable spaces for rest, rejuvenation and slow living."
  }
]

function Reasons() {
  return (
    <Section title='For every kind of getaway'>
      <div className='space-y-8 sm:space-y-6'>
        <Typography
          variant='display'
          serif
          asChild
        >
          <h2>Mocca Living is ideal for:</h2>
        </Typography>
        <ul className='grid gap-4 sm:grid-cols-6'>
          {reasons.map(({title, description, Icon}, index) => (
            <ReasonCard
              key={title}
              className={index < 3 ? 'sm:col-span-2' : 'sm:col-span-3'}
              icon={Icon}
              title={title}
              description={description}
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
