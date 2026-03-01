import {
  Building2Icon,
  EvChargerIcon,
  type LucideProps,
  MapPinnedIcon,
  PlaneIcon,
  UtensilsIcon,
  WavesIcon
} from 'lucide-react'
import {useTranslations} from 'next-intl'
import type * as React from 'react'
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
                icon={WavesIcon}
              />
              <DistanceItem
                title={t('restaurant.title')}
                description={t('restaurant.description')}
                icon={UtensilsIcon}
              />
              <DistanceItem
                title={t('charge.title')}
                description={t('charge.description')}
                icon={EvChargerIcon}
              />
            </ul>
          </CardContent>
        </Card>
      </Container>
    </Section>
  )
}

function DistanceItem({
  title,
  description,
  icon: Icon
}: {
  title: string
  description: string
  icon: React.ComponentType<LucideProps>
}) {
  return (
    <li className='space-y-2'>
      <h5 className='flex gap-2'>
        <Icon className='w-5 h-lh shrink-0' />
        <Typography variant='h5'>{title}</Typography>
      </h5>
      <Typography
        className='leading-8 sm:pl-7'
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
