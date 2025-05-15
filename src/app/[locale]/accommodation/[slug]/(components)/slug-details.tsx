import * as React from 'react'
import {useTranslations} from 'next-intl'
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
import {Section} from '@/src/components/shared/section'
import {ClientLink} from '@/src/components/shared/client-link'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from '@/src/components/ui/card'
import {Button} from '@/src/components/ui/button'
import {Typography} from '@/src/components/ui/typography'
import {Separator} from '@/src/components/ui/separator'
import {SlugForm} from '@/src/app/[locale]/accommodation/[slug]/(components)/slug-form'

const SlugDetails: React.FC<{slug: Slug}> = ({slug}) => {
  const t = useTranslations('Pages.Accommodation.Slug.card')
  const oppositeSlug = slug === 'dimitra' ? 'georgia' : 'dimitra'

  return (
    <Container
      className='px-3'
      asChild
    >
      <Section className='space-y-4'>
        <Card className='p-0 space-y-0'>
          <div className='py-1 px-2 flex items-center justify-between'>
            <Button
              variant='ghost'
              size='small'
              asChild
            >
              <ClientLink href='/accommodation'>
                <ChevronLeftIcon size={16} />
                <span>{t('links.back')}</span>
              </ClientLink>
            </Button>
            <Button
              variant='ghost'
              size='small'
              asChild
            >
              <ClientLink
                scroll={false}
                href={`/accommodation/${oppositeSlug}`}
              >
                <span className='capitalize'>{t('links.next', {slug})}</span>
                <ChevronRightIcon size={16} />
              </ClientLink>
            </Button>
          </div>
          <Separator />
          <CardContent className='px-4 py-6 space-y-10 sm:p-6'>
            <CardHeader className='space-y-6'>
              <CardTitle>{t(`content.${slug}.name`)}</CardTitle>
              <div className='grid grid-cols-2 gap-y-2 gap-x-6 sm:grid-cols-none sm:grid-flow-col sm:auto-cols-max sm:gap-8'>
                <SlugBadge icon={UsersIcon}>
                  {t(`content.${slug}.guests`)}
                </SlugBadge>
                <SlugBadge icon={BabyIcon}>
                  {t(`content.${slug}.child`)}
                </SlugBadge>
                <SlugBadge icon={BedDoubleIcon}>
                  {t(`content.${slug}.bedrooms`)}
                </SlugBadge>
                <SlugBadge icon={ToiletIcon}>
                  {t(`content.${slug}.bathrooms`)}
                </SlugBadge>
                <SlugBadge icon={LandPlotIcon}>
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
            <CardFooter className='justify-end'>
              <SlugForm slug={slug} />
            </CardFooter>
          </CardContent>
        </Card>
      </Section>
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
    <article className='space-y-2'>
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
    </article>
  )
}

SlugDetails.displayName = 'SlugDetails'
SlugBadge.displayName = 'SlugBadge'
SlugList.displayName = 'SlugList'

export {SlugDetails}
