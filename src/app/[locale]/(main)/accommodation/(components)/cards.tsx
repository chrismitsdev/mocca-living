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
import {Link} from '@/src/i18n/navigation'
import {MOCCA_CITY_GMAP, MOCCA_SEA_GMAP} from '@/src/lib/utils'

function Cards() {
  const t = useTranslations('Pages.accommodation.index.cards')

  return (
    <Section>
      <Container>
        <div className='grid gap-10 md:grid-cols-3'>
          <AccommodationCard
            imageSrc={seaDimitraCover}
            imageAlt='Mocca by the sea Dimitra indoor image'
            title={t('sea-dimitra.title')}
            description={t('sea-dimitra.description')}
            numberGuests={t('sea-dimitra.guests')}
            numberBedrooms={t('sea-dimitra.bedrooms')}
            numberBathrooms={t('sea-dimitra.bathrooms')}
            numberChildren={t('sea-dimitra.children')}
            location={MOCCA_SEA_GMAP}
            href='/accommodation/mocca-sea/sea-dimitra'
          />
          <AccommodationCard
            imageSrc={seaGeorgiaCover}
            imageAlt='Mocca by the sea Georgia indoor image'
            title={t('sea-georgia.title')}
            description={t('sea-georgia.description')}
            numberGuests={t('sea-georgia.guests')}
            numberBedrooms={t('sea-georgia.bedrooms')}
            numberBathrooms={t('sea-georgia.bathrooms')}
            numberChildren={t('sea-georgia.children')}
            location={MOCCA_SEA_GMAP}
            href='/accommodation/mocca-sea/sea-georgia'
          />
          <AccommodationCard
            imageSrc={cityDimitraCover}
            imageAlt='Mocca City Dimitra indoor image'
            title={t('mocca-city.title')}
            description={t('mocca-city.description')}
            numberGuests={t('mocca-city.guests')}
            numberBedrooms={t('mocca-city.bedrooms')}
            numberBathrooms={t('mocca-city.bathrooms')}
            numberChildren={t('mocca-city.children')}
            location={MOCCA_CITY_GMAP}
            href='/accommodation/mocca-city/city-dimitra'
          />
        </div>
      </Container>
    </Section>
  )
}

function AccommodationCard({
  imageSrc,
  imageAlt,
  title,
  description,
  numberGuests,
  numberChildren,
  numberBedrooms,
  numberBathrooms,
  location,
  href
}: {
  imageSrc: StaticImageData
  imageAlt: string
  title: string
  description: string
  numberGuests: string
  numberChildren: string
  numberBedrooms: string
  numberBathrooms: string
  location: string
  href: string
}) {
  const t = useTranslations('Pages.accommodation.index.cards.static')

  return (
    <Card>
      <CustomImage
        className='block-auto min-block-80'
        src={imageSrc}
        alt={imageAlt}
        sizes='(min-width: 640px) 730px, 343px'
      />
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <div className='grid grid-cols-2 gap-2'>
          <Badge>
            <IconUserFilled />
            <span>{numberGuests}</span>
          </Badge>
          <Badge>
            <IconMoodKidFilled />
            <span>{numberChildren}</span>
          </Badge>
          <Badge>
            <IconBedFilled />
            <span>{numberBedrooms}</span>
          </Badge>
          <Badge>
            <IconBadgeWcFilled />
            <span>{numberBathrooms}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className='flex flex-wrap justify-between'>
        <Button asChild>
          <Link
            href={location}
            target='_blank'
            rel='noopener noreferrer'
          >
            {t(`location_button`)}
          </Link>
        </Button>
        <Button asChild>
          <Link href={href}>{t(`more_button`)}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export {Cards}
