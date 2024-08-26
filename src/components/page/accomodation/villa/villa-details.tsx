import {useTranslations} from 'next-intl'
import {Link} from '@/navigation'
import {
  DotIcon,
  UsersIcon,
  BabyIcon,
  BedDoubleIcon,
  BathIcon,
  LandPlotIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from 'lucide-react'
import {Container} from '@/components/shared/container'
import {Card, CardHeader, CardTitle, CardContent} from '@/components/ui/card'
import {Separator} from '@/components/ui/separator'
import {Typography} from '@/components/ui/typography'
import {Button} from '@/components/ui/button'

type VillaDetailsProps = {
  slug: Slug
}

function VillaDetails({slug}: VillaDetailsProps) {
  const t = useTranslations('Pages.Accomodation.Slug')
  const tSLug = useTranslations(`Pages.Accomodation.Slug.${slug}`)
  const tHead = useTranslations('Pages.Accomodation.SlugHeaders')

  return (
    <Container
      className='px-0 sm:px-3'
      asChild
    >
      <article>
        <div className='flex justify-between'>
          <Button
            variant='ghost'
            size='small'
            asChild
          >
            <Link href='/accomodation'>
              <ChevronLeftIcon size={16} />
              <span>{tHead('button')}</span>
            </Link>
          </Button>
          <Button
            variant='ghost'
            size='small'
            asChild
          >
            <Link
              scroll={false}
              href={`/accomodation/${
                slug === 'dimitra' ? 'georgia' : 'dimitra'
              }`}
            >
              <span className='capitalize'>
                {slug === 'dimitra' ? t('georgia.name') : t('dimitra.name')}
              </span>
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <Separator className='mt-2 mb-6' />
        <Card className='p-0 space-y-0 shadow-none sm:shadow-medium'>
          <CardHeader className='px-3 py-8 space-y-6 sm:p-8'>
            <CardTitle>{tSLug('name')}</CardTitle>
            <div className='grid grid-cols-2 gap-y-4 gap-x-6 sm:grid-cols-none sm:grid-flow-col sm:auto-cols-max sm:gap-8'>
              <VillaFeature>
                <UsersIcon size={20} />
                <Typography variant='large'>{tSLug('guests')}</Typography>
              </VillaFeature>
              <VillaFeature>
                <BabyIcon size={20} />
                <Typography variant='large'>{tSLug('child')}</Typography>
              </VillaFeature>
              <VillaFeature>
                <BedDoubleIcon size={20} />
                <Typography variant='large'>{tSLug('bedrooms')}</Typography>
              </VillaFeature>
              <VillaFeature>
                <BathIcon size={20} />
                <Typography variant='large'>{tSLug('bathrooms')}</Typography>
              </VillaFeature>
              <VillaFeature>
                <LandPlotIcon size={20} />
                <Typography variant='large'>{tSLug('area')}</Typography>
              </VillaFeature>
            </div>
          </CardHeader>
          <CardContent className='px-3 py-8 space-y-8 sm:p-8'>
            <VillaDataRow data={tSLug('layout')}>
              <Typography variant='h5'>{tHead('layout')}</Typography>
            </VillaDataRow>
            <VillaDataRow data={tSLug('amenities.indoor')}>
              <Typography variant='h5'>{tHead('amenities.indoor')}</Typography>
            </VillaDataRow>
            <VillaDataRow data={tSLug('amenities.outdoor')}>
              <Typography variant='h5'>{tHead('amenities.outdoor')}</Typography>
            </VillaDataRow>
            <VillaDataRow data={tSLug('complementary')}>
              <Typography variant='h5'>{tHead('complementary')}</Typography>
            </VillaDataRow>
            <VillaDataRow data={tSLug('request')}>
              <Typography variant='h5'>{tHead('request')}</Typography>
            </VillaDataRow>
          </CardContent>
        </Card>
      </article>
    </Container>
  )
}

function VillaFeature({children}: {children: React.ReactNode}) {
  return (
    <div className='inline-flex items-center gap-1.5 [&>*]:shrink-0'>
      {children}
    </div>
  )
}

function VillaDataRow({
  children,
  data
}: {
  children: React.ReactNode
  data: string
}) {
  return (
    <div className='space-y-4'>
      {children}
      <ul className='space-y-1.5'>
        {data.split(',').map((entry) => (
          <li
            key={entry}
            className='flex items-start gap-1'
          >
            <DotIcon
              className='shrink-0 mt-0.5'
              size={20}
            />
            <Typography>{entry}</Typography>
          </li>
        ))}
      </ul>
    </div>
  )
}

VillaDetails.displayName = 'VillaDetails'
VillaFeature.displayName = 'VillaFeature'
VillaDataRow.displayName = 'VillaDataRow'

export {VillaDetails}
