import {
  Building2Icon,
  type LucideProps,
  MapPinnedIcon,
  PlaneIcon,
  PlugIcon,
  ShellIcon,
  UtensilsIcon
} from 'lucide-react'
import {useTranslations} from 'next-intl'
import * as React from 'react'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/src/components/ui/card'
import {Typography} from '@/src/components/ui/typography'

const HomeDistances: React.FC = () => {
  const t = useTranslations('Pages.Home.Distances')

  return (
    <Section>
      <Container>
        <Card className='relative space-y-10 sm:p-20'>
          <MapPinnedIcon className='hidden absolute size-3/4 top-1/2 left-1/2 -translate-1/2 text-surface-3 opacity-30 sm:block' />
          <CardHeader className='space-y-4'>
            <CardTitle>{t('title')}</CardTitle>
            <CardDescription>{t('description')}</CardDescription>
          </CardHeader>
          <CardContent className='sm:relative'>
            <ul className='space-y-8'>
              <DistanceItem
                title={t('airport.title')}
                description={t('airport.description')}
                icon={PlaneIcon}
              />
              <DistanceItem
                title={t('city.title')}
                description={t('city.description')}
                icon={Building2Icon}
              />
              <DistanceItem
                title={t('beach.title')}
                description={t('beach.description')}
                icon={ShellIcon}
              />
              <DistanceItem
                title={t('restaurant.title')}
                description={t('restaurant.description')}
                icon={UtensilsIcon}
              />
              <DistanceItem
                title={t('charge.title')}
                description={t('charge.description')}
                icon={PlugIcon}
              />
            </ul>
          </CardContent>
        </Card>
      </Container>
    </Section>
  )
}

const DistanceItem: React.FC<{
  title: string
  description: string
  icon: React.ComponentType<LucideProps>
}> = ({title, description, icon}) => {
  return (
    <li className='space-y-2'>
      <h5 className='flex items-center gap-2'>
        {React.createElement(icon, {size: 16})}
        <Typography variant='h5'>{title}</Typography>
      </h5>
      <Typography
        className='leading-8 sm:pl-6'
        asChild
      >
        <p>{description}</p>
      </Typography>
    </li>
  )
}

HomeDistances.displayName = 'HomeDistances'
DistanceItem.displayName = 'DistanceItem'

export {HomeDistances}
