import {
  IconBeach,
  IconBuildingBank,
  IconChargingPile,
  IconPlane,
  type IconProps,
  IconToolsKitchen3
} from '@tabler/icons-react'
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

function HomeDistances() {
  const t = useTranslations('Pages.Home.Distances')

  return (
    <Section>
      <Container>
        <Card className='sm:p-20'>
          <CardHeader>
            <CardTitle>{t('title')}</CardTitle>
            <CardDescription>
              <Typography>{t('description')}</Typography>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className='space-y-10'>
              <DistanceItem
                title={t('airport.title')}
                description={t('airport.description')}
                icon={IconPlane}
              />
              <DistanceItem
                title={t('city.title')}
                description={t('city.description')}
                icon={IconBuildingBank}
              />
              <DistanceItem
                title={t('beach.title')}
                description={t('beach.description')}
                icon={IconBeach}
              />
              <DistanceItem
                title={t('restaurant.title')}
                description={t('restaurant.description')}
                icon={IconToolsKitchen3}
              />
              <DistanceItem
                title={t('charge.title')}
                description={t('charge.description')}
                icon={IconChargingPile}
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
  icon: React.ComponentType<IconProps>
}) {
  return (
    <li className='space-y-2'>
      <h3 className='flex gap-1.5'>
        <Icon className='shrink-0 w-5 h-lh' />
        <Typography variant='large'>{title}</Typography>
      </h3>
      <Typography className='sm:ps-6.5'>{description}</Typography>
    </li>
  )
}

HomeDistances.displayName = 'HomeDistances'
DistanceItem.displayName = 'DistanceItem'

export {HomeDistances}
