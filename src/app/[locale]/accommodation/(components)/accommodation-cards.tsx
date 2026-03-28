import {
  IconBadgeWcFilled,
  IconBedFilled,
  IconChevronRight,
  IconMoodKidFilled,
  IconUserFilled
} from '@tabler/icons-react'
import type {StaticImageData} from 'next/image'
import {type Messages, useTranslations} from 'next-intl'
import {dimitraCover, georgiaCover} from '@/public/images/covers'
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

type Villas = Messages['Pages']['Accommodation']['Index']['Villas']

type VillaInfo = {
  key: keyof Villas
  image: StaticImageData
  title: Villas[keyof Villas]['title']
  description: Villas[keyof Villas]['description']
  guests: Villas[keyof Villas]['guests']
  children: Villas[keyof Villas]['children']
  bedrooms: Villas[keyof Villas]['bedrooms']
  bathrooms: Villas[keyof Villas]['bathrooms']
  button: Villas[keyof Villas]['button']
}

const villaInfo: Pick<VillaInfo, 'key' | 'image'>[] = [
  {key: 'dimitra', image: dimitraCover},
  {key: 'georgia', image: georgiaCover}
]

function getVillas(
  t: ReturnType<typeof useTranslations<'Pages.Accommodation.Index.Villas'>>
): VillaInfo[] {
  return villaInfo.map(({key, image}) => {
    return {
      key,
      image,
      title: t(`${key}.title`),
      description: t(`${key}.description`),
      guests: t(`${key}.guests`),
      children: t(`${key}.children`),
      bedrooms: t(`${key}.bedrooms`),
      bathrooms: t(`${key}.bathrooms`),
      button: t(`${key}.button`)
    }
  })
}

function AccommodationCards() {
  const villas = getVillas(useTranslations('Pages.Accommodation.Index.Villas'))

  return (
    <Section>
      <Container>
        <div className='grid gap-12 md:grid-cols-2'>
          {villas.map((villa) => (
            <Card key={villa.key}>
              <CustomImage
                className='block-auto min-block-80'
                src={villa.image}
                alt={`${villa.key} indoor image`}
                sizes='(min-width: 640px) 730px, 343px'
              />
              <CardHeader>
                <CardTitle>{villa.title}</CardTitle>
                <CardDescription className='flex flex-wrap gap-2'>
                  <Badge>
                    <IconUserFilled />
                    <span>{villa.guests}</span>
                  </Badge>
                  <Badge>
                    <IconMoodKidFilled />
                    <span>{villa.children}</span>
                  </Badge>
                  <Badge>
                    <IconBedFilled />
                    <span>{villa.bedrooms}</span>
                  </Badge>
                  <Badge>
                    <IconBadgeWcFilled />
                    <span>{villa.bathrooms}</span>
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Typography>{villa.description}</Typography>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href={`/accommodation/${villa.key}`}>
                    <span>{villa.button}</span>
                    <IconChevronRight />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}

AccommodationCards.displayName = 'AccommodationCards'

export {AccommodationCards}
