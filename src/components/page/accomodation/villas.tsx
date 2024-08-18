import {useTranslations} from 'next-intl'
import Image, {type StaticImageData} from 'next/image'
import {Link} from '@/navigation'
import {UsersIcon, BedDoubleIcon, BathIcon} from 'lucide-react'
import {Container} from '@/components/shared/container'
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

type VillaCards = IntlMessages['Pages']['Accomodation']['root']['Cards']

type VillaGeneralInfo<K extends 'dimitra' | 'georgia' = 'dimitra'> = {
  label: keyof VillaCards
  title: VillaCards[K]['title']
  description: VillaCards[K]['description']
  guests: VillaCards[K]['guests']
  bedrooms: VillaCards[K]['bedrooms']
  bathrooms: VillaCards[K]['bathrooms']
  image: StaticImageData
}

const villaInfo: PickOnly<VillaGeneralInfo, 'label' | 'image'>[] = [
  {label: 'georgia', image: georgiaIndoor},
  {label: 'dimitra', image: dimitraIndoor}
]

function Villas() {
  const t = useTranslations('Pages.Accomodation.root.Cards')

  const villas: VillaGeneralInfo[] = villaInfo.map(({label, image}) => ({
    label,
    image,
    title: t(`${label}.title`),
    description: t(`${label}.description`),
    guests: t(`${label}.guests`),
    bedrooms: t(`${label}.bedrooms`),
    bathrooms: t(`${label}.bathrooms`)
  }))

  return (
    <article>
      <Container asChild>
        <div className='grid gap-12 sm:grid-cols-2'>
          {villas.map((villa) => (
            <Card
              key={villa.label}
              className='p-0 space-y-0 overflow-hidden'
            >
              <Image
                className='min-h-80 w-full object-cover'
                src={villa.image}
                alt='Georgia indoor image within a card'
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
              <CardContent className='px-4 text-justify sm:px-6'>{villa.description}</CardContent>
              <CardFooter className='p-4 justify-end sm:p-6'>
                <Button asChild>
                  <Link href={`/accomodation/${villa.label}`}>{'Show me more'}</Link>
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
  return <div className='shrink-0 flex items-center justify-start gap-1'>{children}</div>
}

Villas.displayName = 'Villas'
VillaDetail.displayNaem = 'VillaDetail'

export {Villas}
