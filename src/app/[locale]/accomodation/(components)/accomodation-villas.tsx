import * as React from 'react'
import {useTranslations} from 'next-intl'
import {type StaticImageData} from 'next/image'
import {
  UsersIcon,
  BedDoubleIcon,
  ToiletIcon,
  ChevronRight,
  BabyIcon
} from 'lucide-react'
import {Link} from '@/src/i18n/navigation'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/src/components/ui/card'
import {CustomImage} from '@/src/components/ui/custom-image'
import {Separator} from '@/src/components/ui/separator'
import {Button} from '@/src/components/ui/button'
import {dimitraCover, georgiaCover} from '@/public/images/covers'

type Villas = IntlMessages['Pages']['Accomodation']['Index']['Villas']

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

const tInfo = function (
  t: ReturnType<typeof useTranslations<'Pages.Accomodation.Index.Villas'>>
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

const AccomodationVillas: React.FC = () => {
  const t = useTranslations('Pages.Accomodation.Index.Villas')
  const info = tInfo(t)

  return (
    <Container asChild>
      <Section className='pt-16'>
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
              <CardHeader className='p-4 space-y-4 sm:p-6'>
                <CardTitle>{villa.title}</CardTitle>
                <CardDescription className='pt-1 grid grid-cols-2 gap-x-3 gap-y-2 sm:flex'>
                  <VillaDetail>
                    <UsersIcon size={14} />
                    <span>{villa.guests}</span>
                  </VillaDetail>
                  <Separator
                    className='hidden sm:block sm:h-auto'
                    orientation='vertical'
                  />
                  <VillaDetail>
                    <BabyIcon size={14} />
                    <span>{villa.children}</span>
                  </VillaDetail>
                  <Separator
                    className='hidden sm:block sm:h-auto'
                    orientation='vertical'
                  />
                  <VillaDetail>
                    <BedDoubleIcon size={14} />
                    <span>{villa.bedrooms}</span>
                  </VillaDetail>
                  <Separator
                    className='hidden sm:block sm:h-auto'
                    orientation='vertical'
                  />
                  <VillaDetail>
                    <ToiletIcon size={14} />
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
      </Section>
    </Container>
  )
}

const VillaDetail: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <div className='shrink-0 flex items-center justify-start gap-1'>
      {children}
    </div>
  )
}

AccomodationVillas.displayName = 'AccomodationVillas'
VillaDetail.displayName = 'VillaDetail'

export {AccomodationVillas}
