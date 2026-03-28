import {
  IconArrowAutofitContentFilled,
  IconBadgeWcFilled,
  IconBedFilled,
  IconChevronLeft,
  IconChevronRight,
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

function SlugDetails({slug}: {slug: Slug}) {
  const t = useTranslations('Pages.Accommodation.Slug.card')
  const oppositeSlug = slug === 'dimitra' ? 'georgia' : 'dimitra'

  return (
    <Section>
      <Container>
        <Card className='sm:p-20'>
          <CardHeader className='space-y-6'>
            <div className='flex gap-4 not-sm:justify-between'>
              <Button asChild>
                <Link href='/accommodation'>
                  <IconChevronLeft />
                  <span>{t('links.back')}</span>
                </Link>
              </Button>
              <Button asChild>
                <Link
                  href={`/accommodation/${oppositeSlug}`}
                  scroll={false}
                >
                  <span className='capitalize'>{t('links.next', {slug})}</span>
                  <IconChevronRight />
                </Link>
              </Button>
            </div>
            <CardTitle>{t(`content.${slug}.name`)}</CardTitle>
            <CardDescription className='flex flex-wrap gap-2'>
              <Badge>
                <IconUserFilled />
                <span>{t(`content.${slug}.guests`)}</span>
              </Badge>
              <Badge>
                <IconMoodKidFilled />
                <span>{t(`content.${slug}.child`)}</span>
              </Badge>
              <Badge>
                <IconBedFilled />
                <span>{t(`content.${slug}.bedrooms`)}</span>
              </Badge>
              <Badge>
                <IconBadgeWcFilled />
                <span>{t(`content.${slug}.bathrooms`)}</span>
              </Badge>
              <Badge>
                <IconArrowAutofitContentFilled />
                <span>{t(`content.${slug}.area`)}</span>
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-8'>
            <SlugList data={t(`content.${slug}.layout`)}>
              {t('header.layout')}
            </SlugList>
            <SlugList data={t(`content.${slug}.amenities.indoor`)}>
              {t('header.amenities.indoor')}
            </SlugList>
            <SlugList data={t(`content.${slug}.amenities.outdoor`)}>
              {t('header.amenities.outdoor')}
            </SlugList>
            <SlugList data={t(`content.${slug}.complementary`)}>
              {t('header.complementary')}
            </SlugList>
            <SlugList data={t(`content.${slug}.request`)}>
              {t('header.request')}
            </SlugList>
          </CardContent>
        </Card>
      </Container>
    </Section>
  )
}

function SlugList({data, children}: React.PropsWithChildren<{data: string}>) {
  const renderedData = data.split(', ').map((entry) => {
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
