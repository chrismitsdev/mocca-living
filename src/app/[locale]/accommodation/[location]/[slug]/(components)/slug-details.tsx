import {
  IconArrowAutofitContentFilled,
  IconBadgeWcFilled,
  IconBedFilled,
  IconChevronLeft,
  // IconChevronRight,
  IconMoodKidFilled,
  IconPointFilled,
  IconUserFilled
} from '@tabler/icons-react'
import {useTranslations} from 'next-intl'
import {Container} from '@/src/components/shared/container'
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

function SlugDetails({slug}: {slug: PropertySlug}) {
  const t = useTranslations('Pages.accommodation.slug')
  // const oppositeSlug = slug === 'sea-dimitra' ? 'georgia' : 'dimitra'

  return (
    <Section>
      <Container>
        <Card className='sm:p-20'>
          <CardHeader className='space-y-6'>
            <div className='flex gap-4 not-sm:justify-between'>
              <Button asChild>
                <Link href='/accommodation'>
                  <IconChevronLeft />
                  <span>{t('static.back_button')}</span>
                </Link>
              </Button>
              <Button asChild>
                {/*<Link
                  href={`/accommodation/${oppositeSlug}`}
                  scroll={false}
                >
                  <span className='capitalize'>{t('links.next', {slug})}</span>
                  <IconChevronRight />
                </Link>*/}
              </Button>
            </div>
            <CardTitle>{t(`${slug}.title`)}</CardTitle>
            <CardDescription className='flex flex-wrap gap-2'>
              <Badge>
                <IconUserFilled />
                <span>{t(`${slug}.guests`)}</span>
              </Badge>
              <Badge>
                <IconMoodKidFilled />
                <span>{t(`${slug}.child`)}</span>
              </Badge>
              <Badge>
                <IconBedFilled />
                <span>{t(`${slug}.bedrooms`)}</span>
              </Badge>
              <Badge>
                <IconBadgeWcFilled />
                <span>{t(`${slug}.bathrooms`)}</span>
              </Badge>
              <Badge>
                <IconArrowAutofitContentFilled />
                <span>{t(`${slug}.area`)}</span>
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-8'>
            <SlugList data={t(`${slug}.layout`)}>
              {t('static.layout_title')}
            </SlugList>
            <SlugList data={t(`${slug}.amenities.indoor`)}>
              {t('static.amenities_indoor_title')}
            </SlugList>
            <SlugList data={t(`${slug}.amenities.outdoor`)}>
              {t('static.amenities_outdoor_title')}
            </SlugList>
            <SlugList data={t(`${slug}.complementary`)}>
              {t('static.complementary_title')}
            </SlugList>
            <SlugList data={t(`${slug}.request`)}>
              {t('static.request_title')}
            </SlugList>
          </CardContent>
        </Card>
      </Container>
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
        <IconPointFilled className='shrink-0 w-4 h-8' />
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

SlugDetails.displayName = 'SlugDetails'
SlugList.displayName = 'SlugList'

export {SlugDetails}
