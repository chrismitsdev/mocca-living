import {IconDotsVertical} from '@tabler/icons-react'
import {useTranslations} from 'next-intl'
import {
  cityDimitraCover,
  seaDimitraCover,
  seaGeorgiaCover
} from '@/public/images/covers'
import {Button} from '@/src/components/ui/button'
import {CustomImage} from '@/src/components/ui/custom-image'
import {IconButton} from '@/src/components/ui/icon-button'
import {Popup, PopupContent, PopupTrigger} from '@/src/components/ui/popup'
import {Typography} from '@/src/components/ui/typography'
import {Link} from '@/src/i18n/navigation'
import {NavigationListItemLink} from './navigation-list-item-link'

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
        <NavigationListItemLink
          href='/'
          label={t('home')}
        />

        <NavigationListItemLink
          className='flex'
          href='/accommodation'
          label={t('accommodation.title')}
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
                <IconDotsVertical />
              </IconButton>
            </PopupTrigger>
            <PopupContent
              sideOffset={14}
              collisionPadding={16}
            >
              <ul className='grid grid-cols-3 auto-rows-fr'>
                <li>
                  <Link href='/accommodation/mocca-sea/sea-dimitra'>
                    <article className='p-2 space-y-2 hover:bg-surface-3'>
                      <CustomImage
                        className='aspect-square'
                        src={seaDimitraCover}
                        alt='Mocca Sea Dimitra cover image'
                        sizes='200px'
                      />
                      <Typography variant='large'>
                        {t('accommodation.slug.sea-dimitra.title')}
                      </Typography>
                      <Typography variant='small'>
                        {t('accommodation.slug.sea-dimitra.description')}
                      </Typography>
                    </article>
                  </Link>
                </li>
                <li>
                  <Link href='/accommodation/mocca-sea/sea-georgia'>
                    <article className='p-2 space-y-2 hover:bg-surface-3'>
                      <CustomImage
                        className='aspect-square'
                        src={seaGeorgiaCover}
                        alt='Mocca Sea Georgia cover image'
                        sizes='200px'
                      />
                      <Typography variant='large'>
                        {t('accommodation.slug.sea-georgia.title')}
                      </Typography>
                      <Typography variant='small'>
                        {t('accommodation.slug.sea-georgia.description')}
                      </Typography>
                    </article>
                  </Link>
                </li>
                <li>
                  <Link href='/accommodation/mocca-city/city-dimitra'>
                    <article className='p-2 space-y-2 hover:bg-surface-3'>
                      <CustomImage
                        className='aspect-square'
                        src={cityDimitraCover}
                        alt='Mocca City Georgia cover image'
                        sizes='200px'
                      />
                      <Typography variant='large'>
                        {t('accommodation.slug.city-dimitra.title')}
                      </Typography>
                      <Typography variant='small'>
                        {t('accommodation.slug.city-dimitra.description')}
                      </Typography>
                    </article>
                  </Link>
                </li>
              </ul>
            </PopupContent>
          </Popup>
        </NavigationListItemLink>

        <NavigationListItemLink
          href='/contact'
          label={t('contact')}
        />

        <li>
          <Button
            size='small'
            asChild
          >
            <a
              className='uppercase'
              href='https://www.hotelo.gr/en/properties/mocca-living-41'
              target='_blank'
              rel='noopener noreferrer'
            >
              {t('book_button')}
            </a>
          </Button>
        </li>
      </ul>
    </nav>
  )
}

DesktopNavigation.displayName = 'DesktopNavigation'

export {DesktopNavigation}
