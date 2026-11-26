import {IconChevronLeft, type TablerIcon} from '@tabler/icons-react'
import {useTranslations} from 'next-intl'
import {Container} from '@/src/components/shared/container'
import {Button} from '@/src/components/ui/button'
import {IconButton} from '@/src/components/ui/icon-button'
import {Typography} from '@/src/components/ui/typography'
import {Link} from '@/src/i18n/navigation'

type SubpageHeaderProps = {
  title: string
  /** Where the back link goes, e.g. /guests/mocca-city */
  backHref: string
  /** Shown under the title on phones only */
  icon: TablerIcon
}

// Header of a guest-app subpage. Phones: back chevron and centred title on
// one row, then the section's icon. From sm: "‹ Back" above the title
function SubpageHeader({title, backHref, icon: Icon}: SubpageHeaderProps) {
  const t = useTranslations('Pages.guest-app')

  return (
    <Container className='pt-8 sm:pt-12'>
      <Button
        className='mb-4 hidden sm:inline-flex'
        variant='ghost'
        size='small'
        asChild
      >
        <Link href={backHref}>
          <IconChevronLeft aria-hidden />
          {t('back')}
        </Link>
      </Button>
      {/* Phones: the chevron is pinned left so the title stays centred */}
      <div className='relative px-10 text-center sm:px-0 sm:text-left'>
        <IconButton
          className='absolute left-0 top-1/2 -translate-y-1/2 sm:hidden'
          variant='ghost'
          size='normal'
          aria-label={t('back')}
          asChild
        >
          <Link href={backHref}>
            <IconChevronLeft aria-hidden />
          </Link>
        </IconButton>
        <Typography
          variant='h3'
          as='h1'
        >
          {title}
        </Typography>
      </div>
      <Icon
        className='mt-6 mx-auto size-24 sm:hidden'
        stroke={1}
        aria-hidden
      />
    </Container>
  )
}

export {SubpageHeader}
