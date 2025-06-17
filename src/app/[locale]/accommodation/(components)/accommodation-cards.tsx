import {type StaticImageData} from 'next/image'
import {type Messages, useTranslations} from 'next-intl'
import {
  UsersIcon,
  BedDoubleIcon,
  ToiletIcon,
  ChevronRight,
  BabyIcon
} from 'lucide-react'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {ClientLink} from '@/src/components/shared/client-link'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/src/components/ui/card'
import {CustomImage} from '@/src/components/ui/custom-image'
import {Typography} from '@/src/components/ui/typography'
import {Button} from '@/src/components/ui/button'
import {dimitraCover, georgiaCover} from '@/public/images/covers'

type Villas = Messages['Pages']['Accommodation']['Index']['Villas']

type VillaInfo = {
  key: keyof Villas
  title: Villas[keyof Villas]['title']
  description: Villas[keyof Villas]['description']
  guests: Villas[keyof Villas]['guests']
  children: Villas[keyof Villas]['children']
  bedrooms: Villas[keyof Villas]['bedrooms']
  bathrooms: Villas[keyof Villas]['bathrooms']
  button: Villas[keyof Villas]['button']
  image: StaticImageData
}

const villaInfo: Pick<VillaInfo, 'key' | 'image'>[] = [
  {key: 'dimitra', image: dimitraCover},
  {key: 'georgia', image: georgiaCover}
]

const getVillas = function (
  t: ReturnType<typeof useTranslations<'Pages.Accommodation.Index.Villas'>>
): VillaInfo[] {
  return villaInfo.map(function ({key, image}) {
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

const AccommodationCards: React.FC = () => {
  const villas = getVillas(useTranslations('Pages.Accommodation.Index.Villas'))

  return (
    <Container asChild>
      <Section className='pt-16'>
        <div className='grid gap-12 sm:grid-cols-2'>
          {villas.map((villa) => (
            <Card
              key={villa.key}
              className='p-0 space-y-0 overflow-hidden'
            >
              <CustomImage
                className='min-h-80 w-full object-cover'
                src={villa.image}
                alt={`${villa.key} indoor image`}
                sizes='(min-width: 640px) 730px, 343px'
              />
              <CardHeader className='p-4 space-y-4 sm:p-6'>
                <CardTitle>{villa.title}</CardTitle>
                <CardDescription className='grid grid-cols-2 gap-3 sm:flex'>
                  <VillaDetail>
                    <UsersIcon
                      size={14}
                      strokeWidth={2.5}
                    />
                    <span>{villa.guests}</span>
                  </VillaDetail>
                  <VillaDetail>
                    <BabyIcon
                      size={14}
                      strokeWidth={2.5}
                    />
                    <span>{villa.children}</span>
                  </VillaDetail>
                  <VillaDetail>
                    <BedDoubleIcon
                      size={14}
                      strokeWidth={2.5}
                    />
                    <span>{villa.bedrooms}</span>
                  </VillaDetail>
                  <VillaDetail>
                    <ToiletIcon
                      size={14}
                      strokeWidth={2.5}
                    />
                    <span>{villa.bathrooms}</span>
                  </VillaDetail>
                </CardDescription>
              </CardHeader>
              <CardContent className='px-4 sm:px-6'>
                <Typography className='text-lg !leading-7'>
                  {villa.description}
                </Typography>
              </CardContent>
              <CardFooter className='pt-8 px-4 pb-6 justify-end sm:px-6'>
                <Button asChild>
                  <ClientLink href={`/accommodation/${villa.key}`}>
                    <span>{villa.button}</span>
                    <ChevronRight
                      className='mt-1'
                      size={16}
                    />
                  </ClientLink>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Section>
    </Container>
  )
}

const VillaDetail: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <div className='px-2 shrink-0 inline-flex items-center justify-center gap-1.5 bg-surface-3 font-semibold border border-surface-4 rounded'>
      {children}
    </div>
  )
}

AccommodationCards.displayName = 'AccommodationCards'
VillaDetail.displayName = 'VillaDetail'

export {AccommodationCards}
