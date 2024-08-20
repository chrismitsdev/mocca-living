import * as React from 'react'
import {useTranslations} from 'next-intl'
import {DotIcon, UsersIcon, BabyIcon, BedDoubleIcon, BathIcon, LandPlotIcon} from 'lucide-react'
import {Container} from '@/components/shared/container'
import {Link} from '@/navigation'
import {Button} from '@/components/ui/button'
import {Separator} from '@/components/ui/separator'
import {Typography} from '@/components/ui/typography'

type VillaDetailsProps = {
  slug: Slug
}

function VillaDetails({slug}: VillaDetailsProps) {
  const tSLug = useTranslations(`Pages.Accomodation.Slug.${slug}`)
  const tHead = useTranslations('Pages.Accomodation.SlugHeaders')

  return (
    <Container asChild>
      <article>
        <Button asChild>
          <Link href='/accomodation'>{'Go back'}</Link>
        </Button>
        <div className='mt-8 space-y-8'>
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
          <VillaDataRow data={tSLug('layout')}>{tHead('layout')}</VillaDataRow>
          <Separator />
          <VillaDataRow data={tSLug('amenities.indoor')}>{tHead('amenities.indoor')}</VillaDataRow>
          <Separator />
          <VillaDataRow data={tSLug('amenities.outdoor')}>{tHead('amenities.outdoor')}</VillaDataRow>
          <Separator />
          <VillaDataRow data={tSLug('complementary')}>{tHead('complementary')}</VillaDataRow>
          <Separator />
          <VillaDataRow data={tSLug('request')}>{tHead('request')}</VillaDataRow>
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
    <div className='space-y-4'>
      <Typography variant='large'>{children}</Typography>
      <ul className='space-y-0.5'>
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
