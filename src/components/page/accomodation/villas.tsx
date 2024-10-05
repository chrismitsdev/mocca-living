import * as React from 'react'
import {useTranslations} from 'next-intl'
import {type StaticImageData} from 'next/image'
import {UsersIcon, BedDoubleIcon, BathIcon, ChevronRight} from 'lucide-react'
import {Link} from '@/i18n/routing'
import {Container} from '@/components/shared/container'
import {CustomImage} from '@/components/ui/custom-image'
import {Separator} from '@/components/ui/separator'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import georgiaIndoor from '#/public/images/indoor/4.webp'
import dimitraIndoor from '#/public/images/indoor/11.webp'

type Villas = IntlMessages['Pages']['Accomodation']['Index']['Villas']

type VillaInfo = {
  key: keyof Villas
  title: Villas[keyof Villas]['title']
  description: Villas[keyof Villas]['description']
  guests: Villas[keyof Villas]['guests']
  bedrooms: Villas[keyof Villas]['bedrooms']
  bathrooms: Villas[keyof Villas]['bathrooms']
  button: Villas[keyof Villas]['button']
  image: StaticImageData
}

const villaInfo: Pick<VillaInfo, 'key' | 'image'>[] = [
  {key: 'georgia', image: georgiaIndoor},
  {key: 'dimitra', image: dimitraIndoor}
]

const tInfo = function (
  t: ReturnType<typeof useTranslations<'Pages.Accomodation.Index.Villas'>>
) {
  return villaInfo.map(({key, image}) => ({
    key,
    image,
    title: t(`${key}.title`),
    description: t(`${key}.description`),
    guests: t(`${key}.guests`),
    bedrooms: t(`${key}.bedrooms`),
    bathrooms: t(`${key}.bathrooms`),
    button: t(`${key}.button`)
  }))
}

function Villas() {
  const t = useTranslations('Pages.Accomodation.Index.Villas')
  const info = tInfo(t)

  return (
    <article>
      <Container asChild>
        <div className='grid gap-12 sm:grid-cols-2'>
          {info.map((villa) => (
            <Card
              key={villa.key}
              className='p-0 space-y-0 overflow-hidden'
            >
              <CustomImage
                className='min-h-80 w-full object-cover'
                src={villa.image}
                alt={`${villa.key} indoor image`}
                priority
              />
              <CardHeader className='p-4 space-y-4 sm:p-6 sm:space-y-2'>
                <CardTitle>{villa.title}</CardTitle>
                <CardDescription className='flex flex-col gap-0.5 sm:h-6 sm:flex-row sm:justify-end sm:gap-4'>
                  <VillaDetail>
                    <UsersIcon size={16} />
                    <span>{villa.guests}</span>
                  </VillaDetail>
                  <Separator
                    className='hidden sm:block'
                    orientation='vertical'
                  />
                  <VillaDetail>
                    <BedDoubleIcon size={16} />
                    <span>{villa.bedrooms}</span>
                  </VillaDetail>
                  <Separator
                    className='hidden sm:block'
                    orientation='vertical'
                  />
                  <VillaDetail>
                    <BathIcon size={16} />
                    <span>{villa.bathrooms}</span>
                  </VillaDetail>
                </CardDescription>
              </CardHeader>
              <CardContent className='px-4 text-justify sm:px-6'>
                {villa.description}
              </CardContent>
              <CardFooter className='p-4 justify-end sm:p-6'>
                <Button asChild>
                  <Link href={`/accomodation/${villa.key}`}>
                    <span>{villa.button}</span>
                    <ChevronRight
                      className='mt-1'
                      size={16}
                    />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </article>
  )
}

function VillaDetail({children}: {children: React.ReactNode}) {
  return (
    <div className='shrink-0 flex items-center justify-start gap-1'>
      {children}
    </div>
  )
}

Villas.displayName = 'Villas'
VillaDetail.displayName = 'VillaDetail'

export {Villas}
