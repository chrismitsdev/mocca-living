import {NextIntlClientProvider, useTranslations, useMessages} from 'next-intl'
import {Link} from '@/i18n/routing'
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
  const t = useTranslations('Pages.Accomodation')
  const messages = useMessages() as IntlMessages
  const scopedMessages = {
    ...messages.Components.Form,
    ...messages.Metadata.Pages,
    ...messages.Pages.Privacy
  }

  return (
    <Container
      className='px-3'
      asChild
    >
      <article className='space-y-4'>
        <div className='p-0.5 flex justify-between bg-surface-2 border border-surface-3 rounded shadow'>
          <Button
            variant='ghost'
            size='small'
            asChild
          >
            <Link href='/accomodation'>
              <ChevronLeftIcon size={16} />
              <span>{t('SlugHeaders.button')}</span>
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
                {slug === 'dimitra'
                  ? t('Slug.georgia.name')
                  : t('Slug.dimitra.name')}
              </span>
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <Card className='px-4 py-8 space-y-8 sm:p-8'>
          <CardHeader className='space-y-6'>
            <CardTitle>{t(`Slug.${slug}.name`)}</CardTitle>
            <div className='grid grid-cols-2 gap-y-2 gap-x-6 sm:grid-cols-none sm:grid-flow-col sm:auto-cols-max sm:gap-8'>
              <SlugFeature>
                <UsersIcon size={18} />
                <Typography variant='h5'>{t(`Slug.${slug}.guests`)}</Typography>
              </SlugFeature>
              <SlugFeature>
                <BabyIcon size={18} />
                <Typography variant='h5'>{t(`Slug.${slug}.child`)}</Typography>
              </SlugFeature>
              <SlugFeature>
                <BedDoubleIcon size={18} />
                <Typography variant='h5'>
                  {t(`Slug.${slug}.bedrooms`)}
                </Typography>
              </SlugFeature>
              <SlugFeature>
                <BathIcon size={18} />
                <Typography variant='h5'>
                  {t(`Slug.${slug}.bathrooms`)}
                </Typography>
              </SlugFeature>
              <SlugFeature>
                <LandPlotIcon size={18} />
                <Typography variant='h5'>{t(`Slug.${slug}.area`)}</Typography>
              </SlugFeature>
            </div>
          </CardHeader>
          <CardContent className='space-y-6'>
            <SlugDataRow data={t(`Slug.${slug}.layout`)}>
              <Typography variant='h5'>{t('SlugHeaders.layout')}</Typography>
            </SlugDataRow>
            <SlugDataRow data={t(`Slug.${slug}.amenities.indoor`)}>
              <Typography variant='h5'>
                {t('SlugHeaders.amenities.indoor')}
              </Typography>
            </SlugDataRow>
            <SlugDataRow data={t(`Slug.${slug}.amenities.outdoor`)}>
              <Typography variant='h5'>
                {t('SlugHeaders.amenities.outdoor')}
              </Typography>
            </SlugDataRow>
            <SlugDataRow data={t(`Slug.${slug}.complementary`)}>
              <Typography variant='h5'>
                {t('SlugHeaders.complementary')}
              </Typography>
            </SlugDataRow>
            <SlugDataRow data={t(`Slug.${slug}.request`)}>
              <Typography variant='h5'>{t('SlugHeaders.request')}</Typography>
            </SlugDataRow>
          </CardContent>
          <CardFooter className='justify-end'>
            <NextIntlClientProvider messages={scopedMessages}>
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
    <div className='space-y-3'>
      {children}
      <ul className='space-y-1.5'>
        {data.split(',').map((entry) => (
          <li
            key={entry}
            className='flex gap-1 -ml-1.5'
          >
            <DotIcon
              className='shrink-0 mt-1'
              size={16}
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
