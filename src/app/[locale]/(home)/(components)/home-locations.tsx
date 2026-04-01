import {
  IconBeach,
  IconBuildingBank,
  IconBus,
  IconChargingPile,
  IconFerry,
  IconPlane,
  type IconProps,
  IconToolsKitchen3,
  IconWalk
} from '@tabler/icons-react'
import {useTranslations} from 'next-intl'
import type * as React from 'react'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/src/components/ui/tabs'
import {Typography} from '@/src/components/ui/typography'

function HomeLocations() {
  const t = useTranslations('Pages.home.home-distances')

  return (
    <Section>
      <Container>
        <div className='mb-10 space-y-6'>
          <Typography
            variant='h2'
            asChild
          >
            <h2>{t('title')}</h2>
          </Typography>
          <Typography>{t('description')}</Typography>
        </div>
        <Tabs defaultValue='sea'>
          <TabsList>
            <TabsTrigger value='sea'>
              {t('locations.mocca-sea.label')}
            </TabsTrigger>
            <TabsTrigger value='city'>
              {t('locations.mocca-city.label')}
            </TabsTrigger>
          </TabsList>
          <TabsContent value='sea'>
            <Typography>{t('locations.mocca-sea.intro')}</Typography>
            <ul className='space-y-10'>
              <LocationItem
                title={t('locations.mocca-sea.items.charging_station.title')}
                description={t(
                  'locations.mocca-sea.items.charging_station.description'
                )}
                icon={IconChargingPile}
              />
              <LocationItem
                title={t('locations.mocca-sea.items.beach.title')}
                description={t('locations.mocca-sea.items.beach.description')}
                icon={IconBeach}
              />
              <LocationItem
                title={t('locations.mocca-sea.items.restaurant.title')}
                description={t(
                  'locations.mocca-sea.items.restaurant.description'
                )}
                icon={IconToolsKitchen3}
              />
              <LocationItem
                title={t('locations.mocca-sea.items.city.title')}
                description={t('locations.mocca-sea.items.city.description')}
                icon={IconBuildingBank}
              />
              <LocationItem
                title={t('locations.mocca-sea.items.airport.title')}
                description={t('locations.mocca-sea.items.airport.description')}
                icon={IconPlane}
              />
            </ul>
          </TabsContent>
          <TabsContent value='city'>
            <Typography>{t('locations.mocca-city.intro')}</Typography>
            <ul className='space-y-10'>
              <LocationItem
                title={t('locations.mocca-city.items.city_center.title')}
                description={t(
                  'locations.mocca-city.items.city_center.description'
                )}
                icon={IconBuildingBank}
              />
              <LocationItem
                title={t('locations.mocca-city.items.seafront.title')}
                description={t(
                  'locations.mocca-city.items.seafront.description'
                )}
                icon={IconWalk}
              />
              <LocationItem
                title={t('locations.mocca-city.items.port.title')}
                description={t('locations.mocca-city.items.port.description')}
                icon={IconFerry}
              />
              <LocationItem
                title={t('locations.mocca-city.items.airport.title')}
                description={t(
                  'locations.mocca-city.items.airport.description'
                )}
                icon={IconPlane}
              />
              <LocationItem
                title={t('locations.mocca-city.items.bus_station.title')}
                description={t(
                  'locations.mocca-city.items.bus_station.description'
                )}
                icon={IconBus}
              />
            </ul>
          </TabsContent>
        </Tabs>
      </Container>
    </Section>
  )
}

function LocationItem({
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

HomeLocations.displayName = 'HomeLocations'
LocationItem.displayName = 'LocationItem'

export {HomeLocations}
