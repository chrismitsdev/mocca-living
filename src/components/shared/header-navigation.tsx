'use client'

import * as React from 'react'
import {useTranslations, useLocale} from 'next-intl'
import {motion, useTransform, useMotionTemplate} from 'framer-motion'
import {Link, usePathname, locales} from '@/i18n/routing'
import {
  MenuIcon,
  XIcon,
  ChevronRightIcon,
  EllipsisVerticalIcon
} from 'lucide-react'
import {useBoundedScroll} from '@/hooks/useBoundedScroll'
import {cn} from '#/lib/utils'
import {Container} from '@/components/shared/container'
import {Typography} from '@/components/ui/typography'
import {LogoSimple} from '@/components/logos/logo-simple'
import {VisuallyHidden} from '@/components/ui/visually-hidden'
import {Button} from '@/components/ui/button'
import {CustomImage} from '@/components/ui/custom-image'
import {AnimatedBackground} from '@/components/motion/animated-background'
import {LocaleSelect, LocaleSelectItem} from '@/components/shared/locale-select'
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardPortal,
  HoverCardContent,
  HoverCardArrow
} from '@/components/ui/hover-card'
import {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerTitle,
  DrawerClose
} from '@/components/ui/drawer'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from '@/components/ui/collapsible'
import georgiaImage from '#/public/images/georgia/5.webp'
import dimitraImage from '#/public/images/dimitra/8.webp'

const HEADER_MAX_HEIGHT = 128
const HEADER_MIN_HEIGHT = 64
const LOGO_MAX_SCALE = 1
const LOGO_MIN_SCALE = 0.5

function HeaderNavigation() {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [hoverCardOpen, setHoverCardOpen] = React.useState(false)
  const m = useTranslations<'Metadata.Pages'>()
  const t = useTranslations<'Components.LocaleSelect'>()
  const locale = useLocale()
  const pathname = usePathname()
  const {scrollYBoundedProgress} = useBoundedScroll(250)
  const useBoundTransform = (output: [number, number]) =>
    useTransform(scrollYBoundedProgress, [0, 1], output)

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
          ${useBoundTransform([0, 199])}
          ${useBoundTransform([0, 180])}
          ${useBoundTransform([0, 146])} /
          ${useBoundTransform([0.08, 1])}
        )`,
        backgroundColor: useMotionTemplate`rgb(
          ${useBoundTransform([0, 221])}
          ${useBoundTransform([0, 200])}
          ${useBoundTransform([0, 162])} /
          ${useBoundTransform([0.24, 1])}
        )`,
        height: useBoundTransform([HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT])
      }}
    >
      <Container className='px-4 h-[inherit] flex justify-between items-center gap-2 md:px-3'>
        <motion.div
          style={{
            willChange: 'scale, color',
            scale: useBoundTransform([LOGO_MAX_SCALE, LOGO_MIN_SCALE]),
            color: useMotionTemplate`rgb(
              ${useBoundTransform([231, 148])}
              ${useBoundTransform([217, 79])}
              ${useBoundTransform([190, 33])}
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
          className='hidden sm:block'
          style={{
            willChange: 'color',
            color: useMotionTemplate`rgb(
              ${useBoundTransform([231, 69])}
              ${useBoundTransform([217, 50])}
              ${useBoundTransform([190, 39])}
            )`
          }}
        >
          <ul
            className='flex items-center gap-6'
            role='menubar'
          >
            <li role='none'>
              <NavLink
                href='/'
                isActive={pathname === '/'}
              >
                {m('home')}
              </NavLink>
            </li>
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
                >
                  {m('accomodation.root')}
                </NavLink>
                <HoverCardTrigger asChild>
                  <Button
                    className='data-open:bg-surface-2 data-open:text-foreground transition-none'
                    variant='ghost-alt'
                    size='icon-mini'
                  >
                    <EllipsisVerticalIcon size={16} />
                  </Button>
                </HoverCardTrigger>
              </li>
              <HoverCardPortal>
                <HoverCardContent collisionPadding={16}>
                  <section className='columns-2'>
                    <AnimatedBackground
                      className='bg-surface-3 rounded'
                      transition={{
                        bounce: 0.2,
                        duration: 0.6,
                        type: 'spring'
                      }}
                      enableHover
                    >
                      <Link
                        data-id='1'
                        href='/accomodation/georgia'
                        onClick={() => setHoverCardOpen(false)}
                      >
                        <article className='p-3 space-y-1'>
                          <CustomImage
                            className='aspect-square object-cover rounded'
                            src={georgiaImage}
                            alt='Georgia card image'
                          />
                          <Typography variant='h5'>{'Georgia'}</Typography>
                          <Typography variant='small'>
                            {
                              'Discover Villa Georgia, a charming 45m² retreat for 4 guests near the sea.'
                            }
                          </Typography>
                        </article>
                      </Link>
                      <Link
                        data-id='2'
                        href='/accomodation/dimitra'
                        onClick={() => setHoverCardOpen(false)}
                      >
                        <article className='p-3 space-y-1'>
                          <CustomImage
                            className='aspect-square object-cover rounded'
                            src={dimitraImage}
                            alt='Dimitra card image'
                          />
                          <Typography variant='h5'>{'Dimitra'}</Typography>
                          <Typography variant='small'>
                            {
                              'Experience luxury at Villa Dimitra, an 80m² retreat for 5 guests.'
                            }
                          </Typography>
                        </article>
                      </Link>
                    </AnimatedBackground>
                  </section>
                  <HoverCardArrow />
                </HoverCardContent>
              </HoverCardPortal>
            </HoverCard>
            <li role='none'>
              <NavLink
                href='/contact'
                isActive={pathname === '/contact'}
              >
                {m('contact')}
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
                  ${useBoundTransform([231, 69])}
                  ${useBoundTransform([217, 50])}
                  ${useBoundTransform([190, 39])}
                )`,
                translateY: useBoundTransform([-20, 0])
              }}
            >
              <MenuIcon size={24} />
            </motion.button>
          </DrawerTrigger>
          <DrawerPortal>
            <DrawerOverlay />
            <DrawerContent className='w-3/4'>
              <div className='p-8 h-full grid grid-rows-[1fr,auto]'>
                <VisuallyHidden>
                  <DrawerTitle>{'Sidebar navigation menu'}</DrawerTitle>
                </VisuallyHidden>
                <nav className='flex'>
                  <ul
                    className='my-auto w-full space-y-6'
                    role='menubar'
                  >
                    <li role='none'>
                      <NavLink
                        isActive={pathname === '/'}
                        href='/'
                        onClick={() => setDrawerOpen(false)}
                      >
                        {m('home')}
                      </NavLink>
                    </li>
                    <Collapsible
                      className='group'
                      defaultOpen={
                        pathname === '/accomodation/georgia' ||
                        pathname === '/accomodation/dimitra'
                      }
                      asChild
                    >
                      <li role='none'>
                        <div className='flex items-center justify-between'>
                          <NavLink
                            isActive={pathname === '/accomodation'}
                            href='/accomodation'
                            onClick={() => setDrawerOpen(false)}
                          >
                            {m('accomodation.root')}
                          </NavLink>
                          <CollapsibleTrigger asChild>
                            <Button
                              variant='link'
                              size='icon-mini'
                            >
                              <ChevronRightIcon
                                className='group-data-open:rotate-90 group-data-open:duration-750 group-data-closed:duration-375'
                                size={16}
                              />
                            </Button>
                          </CollapsibleTrigger>
                        </div>
                        <CollapsibleContent
                          className='overflow-hidden group-data-open:animate-collapsible-open group-data-closed:animate-collapsible-close'
                          asChild
                        >
                          <ul
                            className='ml-2 pl-3 relative before:absolute before:h-[calc(100%-16px)] before:w-px before:top-1/2 before:-translate-y-1/2 before:left-0 before:bg-surface-3'
                            role='menu'
                          >
                            <li
                              className='pt-1'
                              role='none'
                            >
                              <NavLink
                                isActive={pathname === '/accomodation/georgia'}
                                href='/accomodation/georgia'
                                onClick={() => setDrawerOpen(false)}
                              >
                                {m('accomodation.georgia')}
                              </NavLink>
                            </li>
                            <li role='none'>
                              <NavLink
                                isActive={pathname === '/accomodation/dimitra'}
                                href='/accomodation/dimitra'
                                onClick={() => setDrawerOpen(false)}
                              >
                                {m('accomodation.dimitra')}
                              </NavLink>
                            </li>
                          </ul>
                        </CollapsibleContent>
                      </li>
                    </Collapsible>
                    <li role='none'>
                      <NavLink
                        isActive={pathname === '/contact'}
                        href='/contact'
                        onClick={() => setDrawerOpen(false)}
                      >
                        {m('contact')}
                      </NavLink>
                    </li>
                  </ul>
                </nav>
                <LocaleSelect
                  defaultValue={locale}
                  loadingText={t('loadingText')}
                  placeholder={t('placeholder')}
                  noScroll
                >
                  {locales.map((localeEntry) => (
                    <LocaleSelectItem
                      key={localeEntry}
                      value={localeEntry}
                    >
                      {t(`values.${localeEntry}`)}
                    </LocaleSelectItem>
                  ))}
                </LocaleSelect>
              </div>
              <DrawerClose asChild>
                <motion.button
                  style={{
                    padding: '8px',
                    position: 'absolute',
                    right: '16px',
                    willChange: 'top',
                    top: useBoundTransform([24, 12])
                  }}
                >
                  <XIcon size={24} />
                </motion.button>
              </DrawerClose>
            </DrawerContent>
          </DrawerPortal>
        </Drawer>
      </Container>
    </motion.header>
  )
}

function NavLink({
  isActive,
  draggable = false,
  role = 'menuitem',
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  isActive: boolean
}) {
  return (
    <Link
      className={cn('p-1 inline-block', isActive && 'font-bold')}
      draggable={draggable}
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

HeaderNavigation.displayName = 'HeaderNavigation'
NavLink.displayName = 'NavLink'

export {HeaderNavigation}
