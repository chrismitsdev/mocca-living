import {
  IconBadgeWcFilled,
  IconBedFilled,
  IconMoodKidFilled,
  IconUserFilled
} from '@tabler/icons-react'
import type {StaticImageData} from 'next/image'
import {useTranslations} from 'next-intl'
import {
  cityDimitraCover,
  seaDimitraCover,
  seaGeorgiaCover
} from '@/public/images/covers'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {Badge} from '@/src/components/ui/badge'
import {Button} from '@/src/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/src/components/ui/card'
import {CustomImage} from '@/src/components/ui/custom-image'
import {Typography} from '@/src/components/ui/typography'
import {Link} from '@/src/i18n/navigation'
import {CITY_GEORGIA_GMAP, SEA_GMAP} from '@/src/lib/utils'

type PropertyCard = {key: PropertySlug; cover: StaticImageData}

const data: {location: PropertyLocation; slugs: PropertyCard[]}[] = [
  {
    location: 'mocca-sea',
    slugs: [
      {key: 'sea-dimitra', cover: seaDimitraCover},
      {key: 'sea-georgia', cover: seaGeorgiaCover}
    ]
  },
  {
    location: 'mocca-city',
    slugs: [{key: 'city-dimitra', cover: cityDimitraCover}]
  }
]

function AccommodationCards() {
  const t = useTranslations()

  const renderedCards = data.map(({location, slugs}) => {
    return (
      <div
        key={location}
        className='space-y-4'
      >
        <Typography variant='h4'>
          {t(`Metadata.accommodation.location.${location}.title`)}
        </Typography>

        <div className='grid gap-10 md:grid-cols-2'>
          {slugs.map(({key, cover}) => {
            return (
              <Card key={key}>
                <CustomImage
                  className='block-auto min-block-80'
                  src={cover}
                  alt={`${key} indoor image`}
                  sizes='(min-width: 640px) 730px, 343px'
                />
                <CardHeader>
                  <CardTitle>
                    {t(`Pages.accommodation.index.cards.${key}.title`)}
                  </CardTitle>
                  <CardDescription className='grid grid-cols-2 gap-2'>
                    <Badge>
                      <IconUserFilled />
                      <span>
                        {t(`Pages.accommodation.index.cards.${key}.guests`)}
                      </span>
                    </Badge>
                    <Badge>
                      <IconMoodKidFilled />
                      <span>
                        {t(`Pages.accommodation.index.cards.${key}.children`)}
                      </span>
                    </Badge>
                    <Badge>
                      <IconBedFilled />
                      <span>
                        {t(`Pages.accommodation.index.cards.${key}.bedrooms`)}
                      </span>
                    </Badge>
                    <Badge>
                      <IconBadgeWcFilled />
                      <span>
                        {t(`Pages.accommodation.index.cards.${key}.bathrooms`)}
                      </span>
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Typography>
                    {t(`Pages.accommodation.index.cards.${key}.description`)}
                  </Typography>
                </CardContent>
                <CardFooter className='flex flex-wrap justify-between'>
                  <Button asChild>
                    <Link
                      href={key.includes('sea') ? SEA_GMAP : CITY_GEORGIA_GMAP}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {t(
                        `Pages.accommodation.index.cards.static.location_button`
                      )}
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link href={`/accommodation/${location}/${key}`}>
                      {t(`Pages.accommodation.index.cards.static.more_button`)}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    )
  })

  return (
    <Section>
      <Container>
        <div className='space-y-20'>{renderedCards}</div>
      </Container>
    </Section>
  )
}

AccommodationCards.displayName = 'AccommodationCards'

export {AccommodationCards}
