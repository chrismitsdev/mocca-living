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

const itemsByLocation: Record<
  PropertyLocation,
  {
    key: 'item_1' | 'item_2' | 'item_3' | 'item_4' | 'item_5'
    icon: React.ComponentType<IconProps>
  }[]
> = {
  'mocca-sea': [
    {key: 'item_1', icon: IconChargingPile},
    {key: 'item_2', icon: IconBeach},
    {key: 'item_3', icon: IconToolsKitchen3},
    {key: 'item_4', icon: IconBuildingBank},
    {key: 'item_5', icon: IconPlane}
  ],
  'mocca-city': [
    {key: 'item_1', icon: IconBuildingBank},
    {key: 'item_2', icon: IconBus},
    {key: 'item_3', icon: IconWalk},
    {key: 'item_4', icon: IconFerry},
    {key: 'item_5', icon: IconPlane}
  ]
}

function SlugDistances({location}: {location: PropertyLocation}) {
  const t = useTranslations('Pages.accommodation.slug.distances')
  const items = itemsByLocation[location]

  const renderedItems = items.map(({key, icon}) => {
    return (
      <SlugDistanceItem
        key={key}
        icon={icon}
        title={t(`${location}.items.${key}.title`)}
        description={t(`${location}.items.${key}.description`)}
      />
    )
  })

  return (
    <Section className='pt-16'>
      <Container>
        <Card className='sm:p-20'>
          <CardHeader>
            <CardTitle>{t('title')}</CardTitle>
            <CardDescription>{t(`${location}.description`)}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className='space-y-10'>{renderedItems}</ul>
          </CardContent>
        </Card>
      </Container>
    </Section>
  )
}

function SlugDistanceItem({
  icon: Icon,
  title,
  description
}: {
  icon: React.ComponentType<IconProps>
  title: string
  description: string
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

SlugDistances.displayName = 'SlugDistances'
SlugDistanceItem.displayName = 'SlugDistanceItem'

export {SlugDistances}
