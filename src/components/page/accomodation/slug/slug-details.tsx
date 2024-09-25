import * as React from 'react'
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
  ChevronRightIcon,
  LucideProps
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
        <Card className='px-4 py-8 space-y-8 sm:p-8'>
          <CardHeader className='space-y-6'>
            <CardTitle>{t(`Slug.${slug}.name`)}</CardTitle>
            <div className='grid grid-cols-2 gap-y-2 gap-x-6 sm:grid-cols-none sm:grid-flow-col sm:auto-cols-max sm:gap-8'>
              <SlugBadge icon={UsersIcon}>{t(`Slug.${slug}.guests`)}</SlugBadge>
              <SlugBadge icon={BabyIcon}>{t(`Slug.${slug}.child`)}</SlugBadge>
              <SlugBadge icon={BedDoubleIcon}>
                {t(`Slug.${slug}.bedrooms`)}
              </SlugBadge>
              <SlugBadge icon={BathIcon}>
                {t(`Slug.${slug}.bathrooms`)}
              </SlugBadge>
              <SlugBadge icon={LandPlotIcon}>
                {t(`Slug.${slug}.area`)}
              </SlugBadge>
            </div>
          </CardHeader>
          <CardContent className='space-y-6'>
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
      </article>
    </Container>
  )
}

function SlugBadge({
  icon,
  children
}: {
  icon?: React.ComponentType<LucideProps>
  children: React.ReactNode
}) {
  return (
    <div className='inline-flex items-center gap-1.5 [&>*]:shrink-0'>
      {icon && <span>{React.createElement(icon, {size: 18})}</span>}
      <Typography variant='h5'>{children}</Typography>
    </div>
  )
}

function SlugList({children, data}: {children: React.ReactNode; data: string}) {
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
