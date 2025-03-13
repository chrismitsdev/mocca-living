'use client'

import * as React from 'react'
import {useTranslations} from 'next-intl'
import {
  MenuIcon,
  XIcon,
  ChevronRightIcon,
  EllipsisVerticalIcon,
  HomeIcon,
  BedDoubleIcon,
  MessageSquareIcon,
  FacebookIcon,
  InstagramIcon,
  type LucideProps
} from 'lucide-react'
import {cn} from '@/src/lib/utils'
import {Link, usePathname} from '@/src/i18n/navigation'
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardPortal,
  HoverCardContent,
  HoverCardArrow
} from '@/src/components/ui/hover-card'
import {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerTitle,
  DrawerClose
} from '@/src/components/ui/drawer'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from '@/src/components/ui/collapsible'
import {ClientLocaleSwitcher} from '@/src/components/shared/locale-switcher/client-locale-switcher'
import {Button} from '@/src/components/ui/button'
import {CustomImage} from '@/src/components/ui/custom-image'
import {Typography} from '@/src/components/ui/typography'
import {Separator} from '@/src/components/ui/separator'
import {dimitraCover, georgiaCover} from '@/public/images/covers'

const Navigation: React.FC = () => {
  const [hoverCardOpen, setHoverCardOpen] = React.useState(false)
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const t = useTranslations<'Metadata.Pages'>()

  return (
    <>
      <nav className='hidden sm:block'>
        <ul
          aria-label='Desktop navigation menu'
          className='flex gap-x-4'
          role='menubar'
        >
          <li role='none'>
            <NavLink
              href='/'
              icon={HomeIcon}
            >
              {t('home')}
            </NavLink>
          </li>
          <Separator
            orientation='vertical'
            className='h-auto'
          />
          <HoverCard
            open={hoverCardOpen}
            onOpenChange={setHoverCardOpen}
            openDelay={50}
          >
            <li
              className='flex items-center gap-0.5'
              role='none'
            >
              <NavLink
                href='/accomodation'
                icon={BedDoubleIcon}
              >
                {t('accomodation.root')}
              </NavLink>
              <HoverCardTrigger asChild>
                <Button
                  className='data-open:bg-primary data-open:text-primary-foreground'
                  variant='ghost'
                  size='icon-mini'
                >
                  <EllipsisVerticalIcon size={16} />
                </Button>
              </HoverCardTrigger>
            </li>
            <HoverCardPortal>
              <HoverCardContent
                sideOffset={18}
                collisionPadding={16}
              >
                <section className='columns-2'>
                  <Link
                    data-id='2'
                    href='/accomodation/dimitra'
                    onClick={() => setHoverCardOpen(false)}
                  >
                    <article className='p-3 space-y-1 rounded hover:bg-surface-3 transition'>
                      <CustomImage
                        className='aspect-square object-cover rounded'
                        src={dimitraCover}
                        alt='Dimitra card image'
                      />
                      <Typography variant='h5'>
                        {t('accomodation.dimitra')}
                      </Typography>
                      <Typography variant='small'>
                        {t('accomodation.dimitra-caption')}
                      </Typography>
                    </article>
                  </Link>
                  <Link
                    data-id='1'
                    href='/accomodation/georgia'
                    onClick={() => setHoverCardOpen(false)}
                  >
                    <article className='p-3 space-y-1 rounded hover:bg-surface-3 transition'>
                      <CustomImage
                        className='aspect-square object-cover rounded'
                        src={georgiaCover}
                        alt='Georgia card image'
                      />
                      <Typography variant='h5'>
                        {t('accomodation.georgia')}
                      </Typography>
                      <Typography variant='small'>
                        {t('accomodation.georgia-caption')}
                      </Typography>
                    </article>
                  </Link>
                </section>
                <HoverCardArrow />
              </HoverCardContent>
            </HoverCardPortal>
          </HoverCard>
          <Separator
            orientation='vertical'
            className='h-auto'
          />
          <li role='none'>
            <NavLink
              href='/contact'
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
      >
        <DrawerTrigger
          className='sm:hidden'
          asChild
        >
          <Button
            variant='bordered'
            size='icon-small'
          >
            <MenuIcon />
          </Button>
        </DrawerTrigger>
        <DrawerPortal>
          <DrawerOverlay />
          <DrawerContent
            side='top'
            className='h-full'
          >
            <div className='pl-7 pr-5 pt-5 pb-3 flex justify-between items-center'>
              <DrawerTitle>Menu</DrawerTitle>
              <DrawerClose asChild>
                <Button
                  variant='ghost-error'
                  size='icon-small'
                >
                  <XIcon />
                </Button>
              </DrawerClose>
            </div>
            <Separator />
            <div className='px-7 py-16 h-[calc(100%-64px)] grid grid-rows-[1fr_auto]'>
              <nav
                aria-label='Mobile navigation bar'
                className='flex'
              >
                <ul
                  aria-label='Mobile navigation menu'
                  className='w-full space-y-8'
                  role='menubar'
                >
                  <li role='none'>
                    <NavLink
                      className='pl-0'
                      href='/'
                      onClick={() => setDrawerOpen(false)}
                      icon={HomeIcon}
                    >
                      {t('home')}
                    </NavLink>
                  </li>
                  <Collapsible asChild>
                    <li role='none'>
                      <div className='flex items-center justify-between'>
                        <NavLink
                          className='pl-0'
                          href='/accomodation'
                          onClick={() => setDrawerOpen(false)}
                          icon={BedDoubleIcon}
                        >
                          {t('accomodation.root')}
                        </NavLink>
                        <CollapsibleTrigger asChild>
                          <Button
                            variant='link'
                            size='icon-mini'
                          >
                            <ChevronRightIcon
                              className='group-data-open:rotate-90 group-data-open:duration-750 group-data-closed:duration-375'
                              size={20}
                            />
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent>
                        <ul
                          className='mt-4 space-y-4'
                          role='menu'
                        >
                          <li role='none'>
                            <Link
                              href='/accomodation/dimitra'
                              onClick={() => setDrawerOpen(false)}
                            >
                              <div className='flex gap-3 rounded'>
                                <CustomImage
                                  className='size-24 object-cover rounded'
                                  src={dimitraCover}
                                  alt='Dimitra cover image'
                                />
                                <div className='space-y-0.5'>
                                  <Typography variant='h6'>
                                    {t('accomodation.dimitra')}
                                  </Typography>
                                  <Typography variant='small'>
                                    {t('accomodation.dimitra-caption')}
                                  </Typography>
                                </div>
                              </div>
                            </Link>
                          </li>
                          <li role='none'>
                            <Link
                              href='/accomodation/georgia'
                              onClick={() => setDrawerOpen(false)}
                            >
                              <div className='flex gap-3 rounded'>
                                <CustomImage
                                  className='size-24 object-cover rounded'
                                  src={georgiaCover}
                                  alt='Georgia cover image'
                                />
                                <div className='space-y-0.5'>
                                  <Typography variant='h6'>
                                    {t('accomodation.georgia')}
                                  </Typography>
                                  <Typography variant='small'>
                                    {t('accomodation.georgia-caption')}
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
                      onClick={() => setDrawerOpen(false)}
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
                    >
                      <InstagramIcon />
                    </a>
                  </Button>
                </div>
                <ClientLocaleSwitcher />
              </div>
            </div>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
    </>
  )
}

const NavLink: React.FC<
  React.ComponentPropsWithRef<typeof Link> & {
    icon?: React.ComponentType<LucideProps>
  }
> = ({
  draggable = false,
  role = 'menuitem',
  className,
  icon,
  href,
  children,
  ...props
}) => {
  const pathname = usePathname()
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
      {icon &&
        React.createElement(icon, {size: 16, strokeWidth: isActive ? 3 : 2})}
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
