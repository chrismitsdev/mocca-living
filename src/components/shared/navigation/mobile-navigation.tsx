import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconChevronRight
} from '@tabler/icons-react'
import {useTranslations} from 'next-intl'
import dimitraCover from '@/public/images/covers/dimitra.webp'
import georgiaCover from '@/public/images/covers/georgia.webp'
import {LocaleSwitcher} from '@/src/components/shared/locale-switcher'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/src/components/ui/collapsible'
import {CustomImage} from '@/src/components/ui/custom-image'
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger
} from '@/src/components/ui/drawer'
import {IconButton} from '@/src/components/ui/icon-button'
import {Typography} from '@/src/components/ui/typography'
import {Link} from '@/src/i18n/navigation'
import {NavigationListItemLink} from './navigation-list-item-link'

interface MobileNavigationProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function MobileNavigation({open, onOpenChange}: MobileNavigationProps) {
  const t = useTranslations('Metadata.Pages')

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      modal={false}
    >
      <DrawerTrigger
        className='sm:hidden'
        asChild
      >
        <button
          aria-label='Show sidebar menu'
          className='size-8 flex flex-col justify-center items-center gap-y-2 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 *:w-3/4 *:h-0.5 *:bg-primary *:ease-mocca data-open:*:rotate-z-180 data-open:*:scale-x-125 data-open:*:duration-750 data-closed:*:duration-375 group'
          type='button'
        >
          <span className='group-data-open:translate-y-2.5 group-data-open:rotate-45' />
          <span className='group-data-open:opacity-0' />
          <span className='group-data-open:-translate-y-2.5 group-data-open:-rotate-45' />
        </button>
      </DrawerTrigger>
      <DrawerContent
        className='absolute border-t border-t-border shadow-none data-right:inset-bs-full data-right:h-[calc(100dvh-100%)]'
        side='right'
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DrawerTitle className='sr-only'>Navigation menu</DrawerTitle>
        <div className='px-6 py-16 h-full grid grid-rows-[1fr_auto]'>
          <nav
            aria-label='Mobile navigation bar'
            className='flex'
          >
            <ul
              aria-label='Mobile navigation menu'
              className='w-full space-y-10'
            >
              <NavigationListItemLink
                href='/'
                label={t('home')}
              />

              <Collapsible
                className='grid grid-cols-[96px_auto] gap-x-4'
                asChild
              >
                <NavigationListItemLink
                  href='/accommodation'
                  label={t('accommodation.root')}
                >
                  <CollapsibleTrigger asChild>
                    <IconButton
                      aria-label='Show accomodation options'
                      variant='ghost'
                      size='small'
                    >
                      <IconChevronRight className='transition group-data-open:rotate-90' />
                    </IconButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className='col-span-full'>
                    <ul>
                      <li>
                        <Link
                          className='pt-6 flex gap-4'
                          href='/accommodation/dimitra'
                        >
                          <CustomImage
                            className='size-24 object-cover'
                            src={dimitraCover}
                            alt='Dimitra cover image'
                            sizes='96px'
                          />
                          <div>
                            <Typography variant='large'>
                              {t('accommodation.dimitra')}
                            </Typography>
                            <Typography variant='small'>
                              {t('accommodation.dimitra-caption')}
                            </Typography>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          className='pt-6 flex gap-4'
                          href='/accommodation/georgia'
                        >
                          <CustomImage
                            className='size-24 object-cover'
                            src={georgiaCover}
                            alt='Georgia cover image'
                            sizes='96px'
                          />
                          <div>
                            <Typography variant='large'>
                              {t('accommodation.georgia')}
                            </Typography>
                            <Typography variant='small'>
                              {t('accommodation.georgia-caption')}
                            </Typography>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </CollapsibleContent>
                </NavigationListItemLink>
              </Collapsible>

              <NavigationListItemLink
                href='/contact'
                label={t('contact')}
              />
            </ul>
          </nav>

          {/* Bottom bar - social links and LocaleSelect */}
          <div className='flex justify-between'>
            <div className='flex gap-2'>
              <IconButton
                aria-label='Visit our Facebook page (Opens in new tab)'
                variant='outline'
                asChild
              >
                <a
                  href='https://www.facebook.com/profile.php?id=61566665200042'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <IconBrandFacebook />
                </a>
              </IconButton>
              <IconButton
                aria-label='Visit our instagram page (Opens in new tab)'
                variant='outline'
                asChild
              >
                <a
                  href='https://www.instagram.com/moccaliving.premiumstay'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <IconBrandInstagram />
                </a>
              </IconButton>
            </div>
            <LocaleSwitcher />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

MobileNavigation.displayName = 'MobileNavigation'

export {MobileNavigation}
