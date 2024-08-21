import * as React from 'react'
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
    <Container asChild>
      <article className='space-y-8'>
        <div className='flex justify-between'>
          <Button
            size='small'
            asChild
          >
            <Link href='/accomodation'>
              <ChevronLeftIcon size={16} />
              <span>{tHead('button')}</span>
            </Link>
          </Button>
          <Button
            size='small'
            asChild
          >
            <Link
              scroll={false}
              href='/contact'
            >
              {'Contact page'}
            </Link>
          </Button>
          <Button
            size='small'
            asChild
          >
            <Link
              scroll={false}
              href={`/accomodation/${slug === 'dimitra' ? 'georgia' : 'dimitra'}`}
            >
              <span className='capitalize'>{slug === 'dimitra' ? t('georgia.name') : t('dimitra.name')}</span>
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <div className='space-y-8'>
          <Typography variant='h1'>{tSLug('name')}</Typography>
          <div className='flex flex-col gap-4 sm:gap-8 sm:flex-row'>
            <VillaFeature>
              <UsersIcon size={20} />
              <Typography variant='lead'>{tSLug('guests')}</Typography>
            </VillaFeature>
            <VillaFeature>
              <BabyIcon size={20} />
              <Typography variant='lead'>{tSLug('child')}</Typography>
            </VillaFeature>
            <VillaFeature>
              <BedDoubleIcon size={20} />
              <Typography variant='lead'>{tSLug('bedrooms')}</Typography>
            </VillaFeature>
            <VillaFeature>
              <BathIcon size={20} />
              <Typography variant='lead'>{tSLug('bathrooms')}</Typography>
            </VillaFeature>
            <VillaFeature>
              <LandPlotIcon size={20} />
              <Typography variant='lead'>{tSLug('area')}</Typography>
            </VillaFeature>
          </div>
          <Separator />
          <VillaDataRow data={tSLug('layout')}>
            <Typography variant='large'>{tHead('layout')}</Typography>
          </VillaDataRow>
          <Separator />
          <VillaDataRow data={tSLug('amenities.indoor')}>
            <Typography variant='large'>{tHead('amenities.indoor')}</Typography>
          </VillaDataRow>
          <Separator />
          <VillaDataRow data={tSLug('amenities.outdoor')}>
            <Typography variant='large'>{tHead('amenities.outdoor')}</Typography>
          </VillaDataRow>
          <Separator />
          <VillaDataRow data={tSLug('complementary')}>
            <Typography variant='large'>{tHead('complementary')}</Typography>
          </VillaDataRow>
          <Separator />
          <VillaDataRow data={tSLug('request')}>
            <Typography variant='large'>{tHead('request')}</Typography>
          </VillaDataRow>
        </div>
      </article>
    </Container>
  )
}

function VillaFeature({children}: {children: React.ReactNode}) {
  return <div className='inline-flex items-center gap-1.5'>{children}</div>
}

function VillaDataRow({children, data}: {children: React.ReactNode; data: string}) {
  return (
    <div className='space-y-6'>
      {children}
      <ul className='space-y-2'>
        {data.split(',').map((entry) => (
          <li
            key={entry}
            className='flex items-start gap-1'
          >
            <DotIcon
              className='shrink-0'
              size={24}
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
