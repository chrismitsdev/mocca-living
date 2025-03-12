import * as React from 'react'
import {NextIntlClientProvider, useTranslations, useMessages} from 'next-intl'
import {Link} from '@/src/i18n/navigation'
import {
  DotIcon,
  UsersIcon,
  BabyIcon,
  BedDoubleIcon,
  ToiletIcon,
  LandPlotIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  LucideProps
} from 'lucide-react'
import {Container} from '@/src/components/shared/container'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from '@/src/components/ui/card'
import {Button} from '@/src/components/ui/button'
import {Typography} from '@/src/components/ui/typography'
import {SlugForm} from '@/src/app/[locale]/accomodation/[slug]/(components)/slug-form'

interface SlugDetailsProps {
  slug: Slug
  locale: Awaited<Params['params']>['locale']
}

const SlugDetails: React.FC<SlugDetailsProps> = ({slug, locale}) => {
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
      <section className='space-y-4'>
        <div className='p-0.5 flex justify-between bg-surface-2 border border-surface-3 rounded'>
          <Button
            variant='ghost'
            size='small'
            asChild
          >
            <Link href='/accomodation'>
              <ChevronLeftIcon size={16} />
              <span>{t('Slug.headers.button')}</span>
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
        <Card className='px-4 py-8 space-y-10 sm:p-8'>
          <CardHeader className='space-y-6'>
            <CardTitle>{t(`Slug.${slug}.name`)}</CardTitle>
            <div className='grid grid-cols-2 gap-y-2 gap-x-6 sm:grid-cols-none sm:grid-flow-col sm:auto-cols-max sm:gap-8'>
              <SlugBadge icon={UsersIcon}>{t(`Slug.${slug}.guests`)}</SlugBadge>
              <SlugBadge icon={BabyIcon}>{t(`Slug.${slug}.child`)}</SlugBadge>
              <SlugBadge icon={BedDoubleIcon}>
                {t(`Slug.${slug}.bedrooms`)}
              </SlugBadge>
              <SlugBadge icon={ToiletIcon}>
                {t(`Slug.${slug}.bathrooms`)}
              </SlugBadge>
              <SlugBadge icon={LandPlotIcon}>
                {t(`Slug.${slug}.area`)}
              </SlugBadge>
            </div>
          </CardHeader>
          <CardContent className='space-y-10'>
            <SlugList data={t(`Slug.${slug}.layout`)}>
              {t('Slug.headers.layout')}
            </SlugList>
            <SlugList data={t(`Slug.${slug}.amenities.indoor`)}>
              {t('Slug.headers.amenities.indoor')}
            </SlugList>
            <SlugList data={t(`Slug.${slug}.amenities.outdoor`)}>
              {t('Slug.headers.amenities.outdoor')}
            </SlugList>
            <SlugList data={t(`Slug.${slug}.complementary`)}>
              {t('Slug.headers.complementary')}
            </SlugList>
            <SlugList data={t(`Slug.${slug}.request`)}>
              {t('Slug.headers.request')}
            </SlugList>
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
      </section>
    </Container>
  )
}

const SlugBadge: React.FC<
  React.PropsWithChildren<{icon?: React.ComponentType<LucideProps>}>
> = ({icon, children}) => {
  return (
    <div className='inline-flex items-center gap-1.5 [&>*]:shrink-0'>
      {icon && <span>{React.createElement(icon, {size: 18})}</span>}
      <Typography variant='h5'>{children}</Typography>
    </div>
  )
}

const SlugList: React.FC<React.PropsWithChildren<{data: string}>> = ({
  children,
  data
}) => {
  return (
    <section className='space-y-2'>
      <Typography
        variant='h5'
        asChild
      >
        <h5>{children}</h5>
      </Typography>
      <ul className='space-y-1'>
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
    </section>
  )
}

SlugDetails.displayName = 'SlugDetails'
SlugBadge.displayName = 'SlugBadge'
SlugList.displayName = 'SlugList'

export {SlugDetails}
