'use client'

import {
  BedDoubleIcon,
  ChevronRightIcon,
  EllipsisVerticalIcon,
  FacebookIcon,
  HomeIcon,
  InstagramIcon,
  type LucideProps,
  MessageSquareIcon
} from 'lucide-react'
import {useTranslations} from 'next-intl'
import {useEffect, useState} from 'react'
import {dimitraCover, georgiaCover} from '@/public/images/covers'
import {LocaleSwitcher} from '@/src/components/shared/locale-switcher'
import {Button} from '@/src/components/ui/button'
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
import {
  Popup,
  PopupArrow,
  PopupContent,
  PopupPortal,
  PopupTrigger
} from '@/src/components/ui/popup'
import {Separator} from '@/src/components/ui/separator'
import {Typography} from '@/src/components/ui/typography'
import {VisuallyHidden} from '@/src/components/ui/visually-hidden'
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
              icon={HomeIcon}
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
              icon={BedDoubleIcon}
            >
              {t('accommodation.root')}
            </NavLink>
            <Popup
              open={popupOpen}
              onOpenChange={setPopupOpen}
            >
              <PopupTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon-mini'
                  className='data-open:bg-primary data-open:text-primary-foreground'
                >
                  <EllipsisVerticalIcon size={16} />
                </Button>
              </PopupTrigger>
              <PopupPortal>
                <PopupContent
                  sideOffset={20}
                  collisionPadding={16}
                >
                  <section className='columns-2'>
                    <Link href='/accommodation/dimitra'>
                      <article className='p-3 space-y-1 rounded hover:bg-surface-3 transition'>
                        <CustomImage
                          className='aspect-square object-cover rounded'
                          src={dimitraCover}
                          alt='Dimitra card image'
                          sizes='200px'
                        />
                        <Typography variant='h5'>
                          {t('accommodation.dimitra')}
                        </Typography>
                        <Typography variant='small'>
                          {t('accommodation.dimitra-caption')}
                        </Typography>
                      </article>
                    </Link>
                    <Link href='/accommodation/georgia'>
                      <article className='p-3 space-y-1 rounded hover:bg-surface-3 transition'>
                        <CustomImage
                          className='aspect-square object-cover rounded'
                          src={georgiaCover}
                          alt='Georgia card image'
                          sizes='200px'
                        />
                        <Typography variant='h5'>
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
              icon={MessageSquareIcon}
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
          <Button
            className='flex-col z-1 *:w-[70%] *:h-0.5 *:bg-primary *:ease-mocca data-open:*:rotate-z-180 data-open:*:scale-x-125 data-open:*:duration-750 data-closed:*:duration-375 group'
            variant='ghost-alt'
            size='icon-small'
          >
            <div className='group-data-open:translate-y-2.5 group-data-open:rotate-45' />
            <div className='group-data-open:opacity-0' />
            <div className='group-data-open:-translate-y-2.5 group-data-open:-rotate-45' />
          </Button>
        </DrawerTrigger>
        <DrawerContent
          className='absolute top-full h-[calc(100dvh-100%)] border-t border-t-surface-3 shadow-none!'
          side='right'
          onInteractOutside={(e) => e.preventDefault()}
        >
          <VisuallyHidden asChild>
            <DrawerTitle>Navigation menu</DrawerTitle>
          </VisuallyHidden>
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
                    icon={HomeIcon}
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
                        icon={BedDoubleIcon}
                      >
                        {t('accommodation.root')}
                      </NavLink>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant='link'
                          size='icon-small'
                        >
                          <ChevronRightIcon
                            className='group-data-open:rotate-90 group-data-open:duration-750 group-data-closed:duration-375'
                            size={24}
                          />
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent>
                      <ul className='mt-4 space-y-4'>
                        <li role='none'>
                          <Link href='/accommodation/dimitra'>
                            <div className='flex gap-3 rounded'>
                              <CustomImage
                                className='size-24 object-cover rounded'
                                src={dimitraCover}
                                alt='Dimitra cover image'
                                sizes='96px'
                              />
                              <div className='space-y-0.5'>
                                <Typography variant='h6'>
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
                            <div className='flex gap-3 rounded'>
                              <CustomImage
                                className='size-24 object-cover rounded'
                                src={georgiaCover}
                                alt='Georgia cover image'
                                sizes='96px'
                              />
                              <div className='space-y-0.5'>
                                <Typography variant='h6'>
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
                    icon={MessageSquareIcon}
                  >
                    {t('contact')}
                  </NavLink>
                </li>
              </ul>
            </nav>
            <div className='flex justify-between'>
              <div className='flex gap-2'>
                <Button
                  variant='bordered-alt'
                  size='icon-normal'
                  asChild
                >
                  <a
                    target='_blank'
                    href='https://www.facebook.com/profile.php?id=61566665200042'
                    rel='noopener'
                  >
                    <FacebookIcon />
                  </a>
                </Button>
                <Button
                  variant='bordered-alt'
                  size='icon-normal'
                  asChild
                >
                  <a
                    target='_blank'
                    href='https://www.instagram.com/moccaliving.premiumstay'
                    rel='noopener'
                  >
                    <InstagramIcon />
                  </a>
                </Button>
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
  pathname,
  draggable = false,
  role = 'menuitem',
  className,
  icon: Icon,
  href,
  children,
  ...props
}: React.ComponentPropsWithRef<typeof Link> & {
  pathname: string
  icon?: React.ComponentType<LucideProps>
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
      draggable={draggable}
      role={role}
      {...(role === 'menuitem' && isActive ? {'aria-current': 'page'} : {})}
      {...props}
    >
      {Icon && (
        <Icon
          className='size-4'
          strokeWidth={isActive ? 3 : 2}
        />
      )}
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

export {Navigation}
