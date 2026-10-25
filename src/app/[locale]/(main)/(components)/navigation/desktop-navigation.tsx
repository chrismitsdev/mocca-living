import {IconDotsVertical} from '@tabler/icons-react'
import {useTranslations} from 'next-intl'
import {
  moccaCityCover,
  moccaSeaDimitraCover,
  moccaSeaGeorgiaCover
} from '@/public/images/covers'
import {CustomImage} from '@/src/components/ui/custom-image'
import {IconButton} from '@/src/components/ui/icon-button'
import {Popup, PopupContent, PopupTrigger} from '@/src/components/ui/popup'
import {Typography} from '@/src/components/ui/typography'
import {Link} from '@/src/i18n/navigation'
import {ListItemLink} from './list-item-link'

type DesktopNavigationProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function DesktopNavigation({open, onOpenChange}: DesktopNavigationProps) {
  const t = useTranslations('Metadata')

  return (
    <nav className='hidden sm:block'>
      <ul
        aria-label='Desktop navigation menu'
        className='flex items-center gap-x-6'
      >
        <ListItemLink
          href='/'
          label={t('home')}
        />
        <ListItemLink
          href='/about'
          label={t('about')}
        />
        <ListItemLink
          className='flex'
          href='/accommodation'
          label={t('accommodation.index')}
        >
          <Popup
            open={open}
            onOpenChange={onOpenChange}
          >
            <PopupTrigger asChild>
              <IconButton
                aria-label='Open accomodation popup'
                variant='ghost'
                size='small'
              >
                <IconDotsVertical aria-hidden />
              </IconButton>
            </PopupTrigger>
            <PopupContent collisionPadding={16}>
              <ul className='grid grid-cols-3 auto-rows-fr'>
                <li>
                  <Link href='/accommodation/mocca-by-the-sea-dimitra'>
                    <article className='p-2 space-y-2 hover:bg-surface-3'>
                      <CustomImage
                        src={moccaSeaDimitraCover}
                        alt='Mocca Sea Dimitra cover image'
                        sizes='200px'
                      />
                      <Typography variant='large'>
                        {t('accommodation.slug.mocca-by-the-sea-dimitra.title')}
                      </Typography>
                      <Typography variant='small'>
                        {t(
                          'accommodation.slug.mocca-by-the-sea-dimitra.description'
                        )}
                      </Typography>
                    </article>
                  </Link>
                </li>
                <li>
                  <Link href='/accommodation/mocca-by-the-sea-georgia'>
                    <article className='p-2 space-y-2 hover:bg-surface-3'>
                      <CustomImage
                        src={moccaSeaGeorgiaCover}
                        alt='Mocca Sea Georgia cover image'
                        sizes='200px'
                      />
                      <Typography variant='large'>
                        {t('accommodation.slug.mocca-by-the-sea-georgia.title')}
                      </Typography>
                      <Typography variant='small'>
                        {t(
                          'accommodation.slug.mocca-by-the-sea-georgia.description'
                        )}
                      </Typography>
                    </article>
                  </Link>
                </li>
                <li>
                  <Link href='/accommodation/mocca-city'>
                    <article className='p-2 space-y-2 hover:bg-surface-3'>
                      <CustomImage
                        src={moccaCityCover}
                        alt='Mocca City cover image'
                        sizes='200px'
                      />
                      <Typography variant='large'>
                        {t('accommodation.slug.mocca-city.title')}
                      </Typography>
                      <Typography variant='small'>
                        {t('accommodation.slug.mocca-city.description')}
                      </Typography>
                    </article>
                  </Link>
                </li>
              </ul>
            </PopupContent>
          </Popup>
        </ListItemLink>
        <ListItemLink
          href='/contact'
          label={t('contact')}
        />
      </ul>
    </nav>
  )
}

export {DesktopNavigation}
