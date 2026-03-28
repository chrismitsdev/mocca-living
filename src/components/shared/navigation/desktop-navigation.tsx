import {IconDotsVertical} from '@tabler/icons-react'
import {useTranslations} from 'next-intl'
import dimitraCover from '@/public/images/covers/dimitra.webp'
import georgiaCover from '@/public/images/covers/georgia.webp'
import {CustomImage} from '@/src/components/ui/custom-image'
import {IconButton} from '@/src/components/ui/icon-button'
import {Popup, PopupContent, PopupTrigger} from '@/src/components/ui/popup'
import {Typography} from '@/src/components/ui/typography'
import {Link} from '@/src/i18n/navigation'
import {NavigationListItemLink} from './navigation-list-item-link'

function DesktopNavigation() {
  const t = useTranslations('Metadata.Pages')

  return (
    <nav className='hidden sm:block'>
      <ul
        aria-label='Desktop navigation menu'
        className='flex gap-x-6'
      >
        <NavigationListItemLink
          href='/'
          label={t('home')}
        />

        <NavigationListItemLink
          className='flex'
          href='/accommodation'
          label={t('accommodation.index')}
        >
          <Popup>
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
              <ul className='columns-2'>
                <li>
                  <Link href='/accommodation/dimitra'>
                    <article className='p-3 space-y-2 hover:bg-surface-3'>
                      <CustomImage
                        className='aspect-square'
                        src={dimitraCover}
                        alt='Dimitra card image'
                        sizes='200px'
                      />
                      <Typography variant='large'>
                        {t('accommodation.dimitra')}
                      </Typography>
                      <Typography variant='small'>
                        {t('accommodation.dimitra-caption')}
                      </Typography>
                    </article>
                  </Link>
                </li>
                <li>
                  <Link href='/accommodation/georgia'>
                    <article className='p-3 space-y-2 hover:bg-surface-3'>
                      <CustomImage
                        className='aspect-square'
                        src={georgiaCover}
                        alt='Georgia card image'
                        sizes='200px'
                      />
                      <Typography variant='large'>
                        {t('accommodation.georgia')}
                      </Typography>
                      <Typography variant='small'>
                        {t('accommodation.georgia-caption')}
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
      </ul>
    </nav>
  )
}

DesktopNavigation.displayName = 'DesktopNavigation'

export {DesktopNavigation}
