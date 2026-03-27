import {
  IconBadgeWc,
  IconBed,
  IconChevronLeft,
  IconChevronRight,
  IconDimensions,
  IconMoodKid,
  IconPoint,
  type IconProps,
  IconUsers
} from '@tabler/icons-react'
import {useTranslations} from 'next-intl'
import {SlugForm} from '@/src/app/[locale]/accommodation/[slug]/(components)/slug-form'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {Button} from '@/src/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/src/components/ui/card'
import {Separator} from '@/src/components/ui/separator'
import {Typography} from '@/src/components/ui/typography'
import {Link} from '@/src/i18n/navigation'

function SlugDetails({slug}: {slug: Slug}) {
  const t = useTranslations('Pages.Accommodation.Slug.card')
  const oppositeSlug = slug === 'dimitra' ? 'georgia' : 'dimitra'

  return (
    <Container asChild>
      <Section className='space-y-4'>
        <Card className='p-0 space-y-0'>
          <div className='py-1 px-2 flex items-center justify-between'>
            <Button
              variant='ghost'
              size='small'
              asChild
            >
              <Link href='/accommodation'>
                <IconChevronLeft className='size-4' />
                <span>{t('links.back')}</span>
              </Link>
            </Button>
            <Button
              variant='ghost'
              size='small'
              asChild
            >
              <Link
                scroll={false}
                href={`/accommodation/${oppositeSlug}`}
              >
                <span className='capitalize'>{t('links.next', {slug})}</span>
                <IconChevronRight className='size-4' />
              </Link>
            </Button>
          </div>
          <Separator />
          <CardContent className='px-4 py-6 space-y-10 sm:p-6'>
            <CardHeader className='space-y-6'>
              <CardTitle>{t(`content.${slug}.name`)}</CardTitle>
              <div className='grid grid-cols-2 gap-y-2 gap-x-6 sm:grid-cols-none sm:grid-flow-col sm:auto-cols-max sm:gap-8'>
                <SlugBadge icon={IconUsers}>
                  {t(`content.${slug}.guests`)}
                </SlugBadge>
                <SlugBadge icon={IconMoodKid}>
                  {t(`content.${slug}.child`)}
                </SlugBadge>
                <SlugBadge icon={IconBed}>
                  {t(`content.${slug}.bedrooms`)}
                </SlugBadge>
                <SlugBadge icon={IconBadgeWc}>
                  {t(`content.${slug}.bathrooms`)}
                </SlugBadge>
                <SlugBadge icon={IconDimensions}>
                  {t(`content.${slug}.area`)}
                </SlugBadge>
              </div>
            </CardHeader>
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
            <CardFooter>
              <SlugForm slug={slug} />
            </CardFooter>
          </CardContent>
        </Card>
      </Section>
    </Container>
  )
}

function SlugBadge({
  icon: Icon,
  children
}: React.PropsWithChildren<{icon?: React.ComponentType<IconProps>}>) {
  return (
    <div className='inline-flex items-center gap-1.5 *:shrink-0'>
      {Icon && (
        <span>
          <Icon className='size-4.5' />
        </span>
      )}
      <Typography variant='h4'>{children}</Typography>
    </div>
  )
}

function SlugList({children, data}: React.PropsWithChildren<{data: string}>) {
  return (
    <article className='space-y-2'>
      <Typography
        variant='h4'
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
            <IconPoint className='shrink-0 size-4 mt-1' />
            <Typography>{entry}</Typography>
          </li>
        ))}
      </ul>
    </article>
  )
}

SlugDetails.displayName = 'SlugDetails'
SlugBadge.displayName = 'SlugBadge'
SlugList.displayName = 'SlugList'

export {SlugDetails}
