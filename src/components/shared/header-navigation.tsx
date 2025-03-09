'use client'

import * as React from 'react'
import {useTranslations} from 'next-intl'
import {
  type MotionStyle,
  motion,
  useTransform,
  useMotionTemplate
} from 'framer-motion'
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
import {Link, usePathname} from '@/src/i18n/navigation'
import {cn} from '@/src/lib/utils'
import {useBoundedScroll} from '@/src/hooks/useBoundedScroll'
import {Container} from '@/src/components/shared/container'
import {LogoSimple} from '@/src/components/logos/logo-simple'
import {Typography} from '@/src/components/ui/typography'
import {Button} from '@/src/components/ui/button'
import {CustomImage} from '@/src/components/ui/custom-image'
import {ClientLocaleSwitcher} from '@/src/components/shared/locale-switcher/client-locale-switcher'
import {Separator} from '@/src/components/ui/separator'
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
import {dimitraCover, georgiaCover} from '@/public/images/covers'

const HEADER_MAX_HEIGHT = 128
const HEADER_MIN_HEIGHT = 64
const LOGO_MAX_SCALE = 1
const LOGO_MIN_SCALE = 0.5

const HeaderNavigation: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [hoverCardOpen, setHoverCardOpen] = React.useState(false)
  const t = useTranslations<'Metadata.Pages'>()
  const pathname = usePathname()
  const {scrollYBoundedProgress} = useBoundedScroll(250)
  const useBoundedTransform = (output: [number, number]) =>
    useTransform(scrollYBoundedProgress, [0, 1], output)

  const triggerColors: MotionStyle = {
    color: useMotionTemplate`rgb(
      ${useBoundedTransform([148, 231])}
      ${useBoundedTransform([79, 217])}
      ${useBoundedTransform([33, 190])}
    )`,
    backgroundColor: useMotionTemplate`rgb(
      ${useBoundedTransform([221, 148])},
      ${useBoundedTransform([200, 79])},
      ${useBoundedTransform([162, 33])}
    )`
  }

  return (
    <motion.header
      style={{
        display: 'flex',
        alignItems: 'center',
        position: 'fixed',
        insetBlockStart: '0px',
        insetInline: '0px',
        zIndex: '1',
        backdropFilter: 'blur(8px)',
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        willChange: 'border-bottom-color, background-color, height',
        borderBottomColor: useMotionTemplate`rgb(
          ${useBoundedTransform([0, 199])}
          ${useBoundedTransform([0, 180])}
          ${useBoundedTransform([0, 146])} /
          ${useBoundedTransform([0.08, 1])}
        )`,
        backgroundColor: useMotionTemplate`rgb(
          ${useBoundedTransform([0, 221])}
          ${useBoundedTransform([0, 200])}
          ${useBoundedTransform([0, 162])} /
          ${useBoundedTransform([0.24, 1])}
        )`,
        height: useBoundedTransform([HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT])
      }}
    >
      <Container className='px-4 h-[inherit] flex justify-between items-center gap-2 md:px-3'>
        <motion.div
          style={{
            willChange: 'scale, color',
            scale: useBoundedTransform([LOGO_MAX_SCALE, LOGO_MIN_SCALE]),
            color: useMotionTemplate`rgb(
              ${useBoundedTransform([231, 148])}
              ${useBoundedTransform([217, 79])}
              ${useBoundedTransform([190, 33])}
            )`
          }}
        >
          <Link href='/'>
            <LogoSimple
              width={51}
              height={80}
            />
          </Link>
        </motion.div>
        <motion.nav
          aria-label='Desktop navigation bar'
          className='hidden sm:block'
          style={{
            willChange: 'color',
            color: useMotionTemplate`rgb(
              ${useBoundedTransform([231, 69])}
              ${useBoundedTransform([217, 50])}
              ${useBoundedTransform([190, 39])}
            )`
          }}
        >
          <ul
            aria-label='Desktop navigation bar'
            className='flex gap-x-6'
            role='menubar'
          >
            <li role='none'>
              <NavLink
                href='/'
                isActive={pathname === '/'}
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
                className='flex items-center'
                role='none'
              >
                <NavLink
                  href='/accomodation'
                  isActive={pathname === '/accomodation'}
                  icon={BedDoubleIcon}
                >
                  {t('accomodation.root')}
                </NavLink>
                <HoverCardTrigger asChild>
                  <motion.button
                    className='w-6 h-6 flex items-center justify-center rounded'
                    style={
                      hoverCardOpen
                        ? {...triggerColors}
                        : {color: 'unset', backgroundColor: 'unset'}
                    }
                  >
                    <EllipsisVerticalIcon size={16} />
                  </motion.button>
                </HoverCardTrigger>
              </li>
              <HoverCardPortal>
                <HoverCardContent collisionPadding={16}>
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
                isActive={pathname === '/contact'}
                icon={MessageSquareIcon}
              >
                {t('contact')}
              </NavLink>
            </li>
          </ul>
        </motion.nav>

        <Drawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
        >
          <DrawerTrigger asChild>
            <motion.button
              className='sm:hidden'
              style={{
                padding: '8px',
                willChange: 'color, transform',
                color: useMotionTemplate`rgb(
                  ${useBoundedTransform([231, 69])}
                  ${useBoundedTransform([217, 50])}
                  ${useBoundedTransform([190, 39])}
                )`,
                translateY: useBoundedTransform([-20, 0])
              }}
            >
              <MenuIcon size={24} />
            </motion.button>
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
                    aria-label='Mobile navigation bar'
                    className='w-full space-y-8'
                    role='menubar'
                  >
                    <li role='none'>
                      <NavLink
                        className='pl-0'
                        isActive={pathname === '/'}
                        href='/'
                        onClick={() => setDrawerOpen(false)}
                        icon={HomeIcon}
                      >
                        {t('home')}
                      </NavLink>
                    </li>
                    <Collapsible
                      defaultOpen={
                        pathname === '/accomodation/georgia' ||
                        pathname === '/accomodation/dimitra'
                      }
                      asChild
                    >
                      <li role='none'>
                        <div className='flex items-center justify-between'>
                          <NavLink
                            className='pl-0'
                            isActive={pathname === '/accomodation'}
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
                        isActive={pathname === '/contact'}
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
                      className='bg-surface-1'
                      variant='bordered'
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
                      className='bg-surface-1'
                      variant='bordered'
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
      </Container>
    </motion.header>
  )
}

interface NavLinkProps extends React.ComponentPropsWithRef<typeof Link> {
  isActive: boolean
  icon?: React.ComponentType<LucideProps>
}

const NavLink: React.FC<NavLinkProps> = ({
  isActive,
  draggable = false,
  role = 'menuitem',
  className,
  icon,
  children,
  ...props
}) => {
  return (
    <Link
      className={cn(
        'p-1 flex items-center gap-2',
        isActive && 'font-bold',
        className
      )}
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

HeaderNavigation.displayName = 'HeaderNavigation'
NavLink.displayName = 'NavLink'

export {HeaderNavigation}
