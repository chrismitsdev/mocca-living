'use client'

import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconChevronRight,
  IconDotsVertical
} from '@tabler/icons-react'
import {useTranslations} from 'next-intl'
import {useEffect, useState} from 'react'
import {dimitraCover, georgiaCover} from '@/public/images/covers'
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
import {
  Popup,
  PopupArrow,
  PopupContent,
  PopupPortal,
  PopupTrigger
} from '@/src/components/ui/popup'
import {Separator} from '@/src/components/ui/separator'
import {Typography} from '@/src/components/ui/typography'
import {useScrollLock} from '@/src/hooks/useScrollLock'
import {Link, usePathname} from '@/src/i18n/navigation'
import {cn} from '@/src/lib/utils'

function Navigation() {
  const [popupOpen, setPopupOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const pathname = usePathname()
  const t = useTranslations('Metadata.Pages')
  useScrollLock({autoLock: drawerOpen})

  useEffect(() => {
    if (!pathname) return

    setPopupOpen(false)
    setDrawerOpen(false)
  }, [pathname])

  return (
    <>
      <nav className='hidden sm:block'>
        <ul
          aria-label='Desktop navigation menu'
          className='flex gap-x-4'
        >
          <li role='none'>
            <NavLink
              href='/'
              pathname={pathname}
            >
              {t('home')}
            </NavLink>
          </li>
          <Separator
            orientation='vertical'
            className='h-auto'
          />
          <li
            className='flex items-center gap-1'
            role='none'
          >
            <NavLink
              href='/accommodation'
              pathname={pathname}
            >
              {t('accommodation.root')}
            </NavLink>
            <Popup
              open={popupOpen}
              onOpenChange={setPopupOpen}
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
              <PopupPortal>
                <PopupContent
                  sideOffset={16}
                  collisionPadding={16}
                >
                  <section className='columns-2'>
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
                    <Link href='/accommodation/georgia'>
                      <article className='p-3 space-y-2 hover:bg-surface-3'>
                        <CustomImage
                          className='aspect-square object-cover'
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
                  </section>
                  <PopupArrow />
                </PopupContent>
              </PopupPortal>
            </Popup>
          </li>
          <Separator
            orientation='vertical'
            className='h-auto'
          />
          <li role='none'>
            <NavLink
              href='/contact'
              pathname={pathname}
            >
              {t('contact')}
            </NavLink>
          </li>
        </ul>
      </nav>

      <Drawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
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
            <div className='group-data-open:translate-y-2.5 group-data-open:rotate-45' />
            <div className='group-data-open:opacity-0' />
            <div className='group-data-open:-translate-y-2.5 group-data-open:-rotate-45' />
          </button>
        </DrawerTrigger>
        <DrawerContent
          className='absolute top-full h-[calc(100dvh-100%)] border-t border-t-surface-3 shadow-none!'
          side='right'
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DrawerTitle className='sr-only'>Navigation menu</DrawerTitle>
          <div className='px-7 py-16 h-full grid grid-rows-[1fr_auto]'>
            <nav
              aria-label='Mobile navigation bar'
              className='flex'
            >
              <ul
                aria-label='Mobile navigation menu'
                className='w-full space-y-8'
              >
                <li role='none'>
                  <NavLink
                    className='pl-0'
                    href='/'
                    pathname={pathname}
                  >
                    {t('home')}
                  </NavLink>
                </li>
                <Collapsible asChild>
                  <li role='none'>
                    <div className='flex items-center justify-between gap-4'>
                      <NavLink
                        className='pl-0 grow'
                        href='/accommodation'
                        pathname={pathname}
                      >
                        {t('accommodation.root')}
                      </NavLink>
                      <CollapsibleTrigger asChild>
                        <IconButton
                          aria-label='Show accomodation options'
                          variant='ghost'
                          size='small'
                        >
                          <IconChevronRight className='group-data-open:rotate-90 group-data-open:duration-750 group-data-closed:duration-375' />
                        </IconButton>
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent>
                      <ul className='mt-4 space-y-4'>
                        <li role='none'>
                          <Link href='/accommodation/dimitra'>
                            <div className='flex gap-3'>
                              <CustomImage
                                className='size-24 object-cover'
                                src={dimitraCover}
                                alt='Dimitra cover image'
                                sizes='96px'
                              />
                              <div className='space-y-0.5'>
                                <Typography variant='lead'>
                                  {t('accommodation.dimitra')}
                                </Typography>
                                <Typography variant='small'>
                                  {t('accommodation.dimitra-caption')}
                                </Typography>
                              </div>
                            </div>
                          </Link>
                        </li>
                        <li role='none'>
                          <Link href='/accommodation/georgia'>
                            <div className='flex gap-3'>
                              <CustomImage
                                className='size-24 object-cover'
                                src={georgiaCover}
                                alt='Georgia cover image'
                                sizes='96px'
                              />
                              <div className='space-y-0.5'>
                                <Typography variant='lead'>
                                  {t('accommodation.georgia')}
                                </Typography>
                                <Typography variant='small'>
                                  {t('accommodation.georgia-caption')}
                                </Typography>
                              </div>
                            </div>
                          </Link>
                        </li>
                      </ul>
                    </CollapsibleContent>
                  </li>
                </Collapsible>
                <li role='none'>
                  <NavLink
                    className='pl-0'
                    href='/contact'
                    pathname={pathname}
                  >
                    {t('contact')}
                  </NavLink>
                </li>
              </ul>
            </nav>
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
    </>
  )
}

function NavLink({
  role = 'menuitem',
  pathname,
  className,
  href,
  children,
  ...props
}: React.ComponentPropsWithRef<typeof Link> & {
  pathname: string
}) {
  const isActive = pathname === href

  return (
    <Link
      className={cn(
        'p-1 flex items-center gap-2',
        isActive && 'font-bold',
        className
      )}
      href={href}
      role={role}
      {...(role === 'menuitem' && isActive ? {'aria-current': 'page'} : {})}
      {...props}
    >
      <Typography
        className='uppercase'
        variant='small'
      >
        {children}
      </Typography>
    </Link>
  )
}

Navigation.displayName = 'Navigation'
NavLink.displayName = 'NavLink'

export {Navigation}
