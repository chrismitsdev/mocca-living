import {
  IconArrowAutofitContentFilled,
  IconBadgeWcFilled,
  IconBedFilled,
  IconChevronLeft,
  IconMoodKidFilled,
  IconPointFilled,
  IconUserFilled
} from '@tabler/icons-react'
import {type Locale, useTranslations} from 'next-intl'
import {Section} from '@/src/components/shared/section'
import {Badge} from '@/src/components/ui/badge'
import {Button} from '@/src/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/src/components/ui/card'
import {Typography} from '@/src/components/ui/typography'
import {Link} from '@/src/i18n/navigation'
import {HOTELO} from '@/src/lib/constants'

const hrefLookup: Record<PropertySlug, (locale: Locale) => string> = {
  'mocca-by-the-sea-dimitra': HOTELO.moccaSea,
  'mocca-by-the-sea-georgia': HOTELO.moccaSea,
  'mocca-city': HOTELO.moccaCity
}

type DetailsProps = {
  slug: PropertySlug
  locale: Locale
}

function Details({slug, locale}: DetailsProps) {
  const t = useTranslations('Pages.accommodation.slug.details')

  return (
    <Section className='pb-16'>
      <Card className='sm:p-20'>
        <CardHeader className='space-y-6'>
          <div className='flex gap-4 justify-between'>
            <Button asChild>
              <Link href='/accommodation'>
                <IconChevronLeft aria-hidden />
                <span>{t('static.back-button')}</span>
              </Link>
            </Button>
            <Button asChild>
              <Link
                href={hrefLookup[slug](locale)}
                target='_blank'
                rel='noopener noreferrer'
              >
                {`${t('static.book-button')} -15%`}
              </Link>
            </Button>
          </div>
          <CardTitle>{t(`${slug}.title`)}</CardTitle>
          <CardDescription className='flex flex-wrap gap-2'>
            <Badge>
              <IconUserFilled aria-hidden />
              <span>{t(`${slug}.guests`)}</span>
            </Badge>
            <Badge>
              <IconMoodKidFilled aria-hidden />
              <span>{t(`${slug}.child`)}</span>
            </Badge>
            <Badge>
              <IconBedFilled aria-hidden />
              <span>{t(`${slug}.bedrooms`)}</span>
            </Badge>
            <Badge>
              <IconBadgeWcFilled aria-hidden />
              <span>{t(`${slug}.bathrooms`)}</span>
            </Badge>
            <Badge>
              <IconArrowAutofitContentFilled aria-hidden />
              <span>{t(`${slug}.area`)}</span>
            </Badge>
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-8'>
          <SlugList data={t(`${slug}.layout`)}>
            {t('static.layout-title')}
          </SlugList>
          <SlugList data={t(`${slug}.amenities.indoor`)}>
            {t('static.indoor-amenities-title')}
          </SlugList>
          <SlugList data={t(`${slug}.amenities.outdoor`)}>
            {t('static.outdoor-amenities-title')}
          </SlugList>
          <SlugList data={t(`${slug}.complementary`)}>
            {t('static.complementary-title')}
          </SlugList>
          <SlugList data={t(`${slug}.request`)}>
            {t('static.request-title')}
          </SlugList>
        </CardContent>
      </Card>
    </Section>
  )
}

function SlugList({data, children}: React.PropsWithChildren<{data: string}>) {
  if (!data) return null

  const renderedData = data.split('|').map((entry) => {
    return (
      <li
        key={entry}
        className='flex gap-1'
      >
        <IconPointFilled
          className='shrink-0 w-4 h-8'
          aria-hidden
        />
        <Typography>{entry}</Typography>
      </li>
    )
  })

  return (
    <article className='space-y-2'>
      <Typography variant='large'>{children}</Typography>
      <ul className='-ms-1'>{renderedData}</ul>
    </article>
  )
}

export {Details}
