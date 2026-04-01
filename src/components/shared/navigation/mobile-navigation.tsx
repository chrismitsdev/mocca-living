import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconChevronRight
} from '@tabler/icons-react'
import {useTranslations} from 'next-intl'
import {
  cityGeorgiaCover,
  seaDimitraCover,
  seaGeorgiaCover
} from '@/public/images/covers'
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
  const t = useTranslations('Metadata')

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
          className='size-8 flex flex-col justify-center items-center gap-y-2 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 *:inline-3/4 *:block-0.5 *:bg-foreground *:ease-mocca data-open:*:rotate-z-180 data-open:*:scale-x-125 data-open:*:duration-750 data-closed:*:duration-375 group'
          type='button'
        >
          <span className='group-data-open:translate-y-2.5 group-data-open:rotate-45' />
          <span className='group-data-open:opacity-0' />
          <span className='group-data-open:-translate-y-2.5 group-data-open:-rotate-45' />
        </button>
      </DrawerTrigger>
      <DrawerContent
        className='absolute border-t border-t-border shadow-none data-right:inset-bs-full data-right:h-[calc(100svh-100%)]'
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
                className='grid grid-cols-[1fr_auto] gap-x-4'
                asChild
              >
                <NavigationListItemLink
                  href='/accommodation'
                  label={t('accommodation.title')}
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
                    <ul className='mt-6 space-y-4'>
                      <li>
                        <Link
                          className='p-1 flex gap-4'
                          href='/accommodation/sea/sea-dimitra'
                        >
                          <CustomImage
                            className='shrink-0 block-auto inline-16'
                            src={seaDimitraCover}
                            alt='Mocca Sea Dimitra cover image'
                            sizes='96px'
                          />
                          <div>
                            <Typography variant='large'>
                              {t('accommodation.slug.sea-dimitra.title')}
                            </Typography>
                            <Typography variant='small'>
                              {t('accommodation.slug.sea-dimitra.description')}
                            </Typography>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          className='p-1 flex gap-4'
                          href='/accommodation/sea/sea-georgia'
                        >
                          <CustomImage
                            className='shrink-0 block-auto inline-16'
                            src={seaGeorgiaCover}
                            alt='Mocca Sea Georgia cover image'
                            sizes='96px'
                          />
                          <div>
                            <Typography variant='large'>
                              {t('accommodation.slug.sea-georgia.title')}
                            </Typography>
                            <Typography variant='small'>
                              {t('accommodation.slug.sea-georgia.description')}
                            </Typography>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          className='p-1 flex gap-4'
                          href='/accommodation/city/city-georgia'
                        >
                          <CustomImage
                            className='shrink-0 block-auto inline-16'
                            src={cityGeorgiaCover}
                            alt='Mocca City Georgia cover image'
                            sizes='96px'
                          />
                          <div>
                            <Typography variant='large'>
                              {t('accommodation.slug.city-georgia.title')}
                            </Typography>
                            <Typography variant='small'>
                              {t('accommodation.slug.city-georgia.description')}
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
