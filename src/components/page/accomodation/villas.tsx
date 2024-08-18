import Image from 'next/image'
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

export const villaCards = [
  {
    label: 'georgia',
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    image: georgiaIndoor
  },
  {
    label: 'dimitra',
    guests: 5,
    bedrooms: 2,
    bathrooms: 2,
    image: dimitraIndoor
  }
]

function Villas() {
  return (
    <article>
      <Container asChild>
        <div className='grid gap-12 sm:grid-cols-2'>
          {villaCards.map((card) => (
            <Card
              key={card.label}
              className='p-0 space-y-0 overflow-hidden'
            >
              <Image
                className='min-h-80 w-full object-cover'
                src={card.image}
                alt='Georgia indoor image within a card'
                priority
              />
              <CardHeader className='p-4 sm:p-6'>
                <CardTitle>
                  {card.label.replace(card.label[0], card.label[0].toUpperCase())}
                </CardTitle>
                <CardDescription className='h-6 flex justify-between gap-2 sm:justify-end sm:gap-4'>
                  <VillaDetail>
                    <UsersIcon size={16} />
                    <span>{`${card.guests} Guests`}</span>
                  </VillaDetail>
                  <Separator orientation='vertical' />
                  <VillaDetail>
                    <BedDoubleIcon size={16} />
                    <span>{`${card.bedrooms} Bedrooms`}</span>
                  </VillaDetail>
                  <Separator orientation='vertical' />
                  <VillaDetail>
                    <BathIcon size={16} />
                    <span>{`${card.bathrooms} Bathrooms`}</span>
                  </VillaDetail>
                </CardDescription>
              </CardHeader>
              <CardContent className='px-4 text-justify sm:px-6'>
                {
                  'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate facere, asperiores aliquam quisquam iste eos doloribus amet nam. Aspernatur cupiditate eligendi esse quas adipisci odio!'
                }
              </CardContent>
              <CardFooter className='p-4 justify-end sm:p-6'>
                <Button asChild>
                  <Link href={`/accomodation/${card.label}`}>{'Show me more'}</Link>
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
  return <div className='flex items-center justify-start gap-1'>{children}</div>
}

Villas.displayName = 'Villas'

export {Villas}
