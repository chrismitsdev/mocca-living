import {NextIntlClientProvider, useTranslations, useMessages} from 'next-intl'
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
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Typography} from '@/components/ui/typography'
import {SlugForm} from '@/components/page/accomodation/slug/slug-form'

type SlugDetailsProps = {
  slug: Slug
  locale: Params['params']['locale']
}

function SlugDetails({slug, locale}: SlugDetailsProps) {
  const t = useTranslations('Pages.Accomodation.Slug')
  const tSLug = useTranslations(`Pages.Accomodation.Slug.${slug}`)
  const tHead = useTranslations('Pages.Accomodation.SlugHeaders')
  const messages = useMessages() as IntlMessages

  return (
    <Container
      className='px-0 sm:px-3'
      asChild
    >
      <article className='space-y-2'>
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
        <Card className='p-0 space-y-0 shadow-none  sm:shadow-medium'>
          <CardHeader className='px-3 py-8 space-y-6 sm:p-8'>
            <CardTitle>{tSLug('name')}</CardTitle>
            <div className='grid grid-cols-2 gap-y-4 gap-x-6 sm:grid-cols-none sm:grid-flow-col sm:auto-cols-max sm:gap-8'>
              <SlugFeature>
                <UsersIcon size={20} />
                <Typography variant='large'>{tSLug('guests')}</Typography>
              </SlugFeature>
              <SlugFeature>
                <BabyIcon size={20} />
                <Typography variant='large'>{tSLug('child')}</Typography>
              </SlugFeature>
              <SlugFeature>
                <BedDoubleIcon size={20} />
                <Typography variant='large'>{tSLug('bedrooms')}</Typography>
              </SlugFeature>
              <SlugFeature>
                <BathIcon size={20} />
                <Typography variant='large'>{tSLug('bathrooms')}</Typography>
              </SlugFeature>
              <SlugFeature>
                <LandPlotIcon size={20} />
                <Typography variant='large'>{tSLug('area')}</Typography>
              </SlugFeature>
            </div>
          </CardHeader>
          <CardContent className='px-3 py-8 space-y-8 sm:p-8'>
            <SlugDataRow data={tSLug('layout')}>
              <Typography variant='h5'>{tHead('layout')}</Typography>
            </SlugDataRow>
            <SlugDataRow data={tSLug('amenities.indoor')}>
              <Typography variant='h5'>{tHead('amenities.indoor')}</Typography>
            </SlugDataRow>
            <SlugDataRow data={tSLug('amenities.outdoor')}>
              <Typography variant='h5'>{tHead('amenities.outdoor')}</Typography>
            </SlugDataRow>
            <SlugDataRow data={tSLug('complementary')}>
              <Typography variant='h5'>{tHead('complementary')}</Typography>
            </SlugDataRow>
            <SlugDataRow data={tSLug('request')}>
              <Typography variant='h5'>{tHead('request')}</Typography>
            </SlugDataRow>
          </CardContent>
          <CardFooter className='px-3 pb-8 pt-4 sm:px-8 justify-end'>
            <NextIntlClientProvider messages={messages.Components.Form}>
              <SlugForm
                slug={slug}
                locale={locale}
              />
            </NextIntlClientProvider>
          </CardFooter>
        </Card>
      </article>
    </Container>
  )
}

function SlugFeature({children}: {children: React.ReactNode}) {
  return (
    <div className='inline-flex items-center gap-1.5 [&>*]:shrink-0'>
      {children}
    </div>
  )
}

function SlugDataRow({
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

SlugDetails.displayName = 'SlugDetails'
SlugFeature.displayName = 'SlugFeature'
SlugDataRow.displayName = 'SlugDataRow'

export {SlugDetails}
