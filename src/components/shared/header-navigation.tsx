'use client'

import * as React from 'react'
import {useTranslations, useLocale} from 'next-intl'
import {
  type MotionStyle,
  motion,
  useTransform,
  useMotionTemplate
} from 'framer-motion'
import {locales} from '@/src/i18n/routing'
import {Link, usePathname} from '@/src/i18n/navigation'
import {
  MenuIcon,
  XIcon,
  ChevronRightIcon,
  EllipsisVerticalIcon
} from 'lucide-react'
import {cn} from '@/src/lib/utils'
import {useBoundedScroll} from '@/src/hooks/useBoundedScroll'
import {Container} from '@/src/components/shared/container'
import {Typography} from '@/src/components/ui/typography'
import {LogoSimple} from '@/src/components/logos/logo-simple'
import {VisuallyHidden} from '@/src/components/ui/visually-hidden'
import {Button} from '@/src/components/ui/button'
import {CustomImage} from '@/src/components/ui/custom-image'
import {
  LocaleSelect,
  LocaleSelectItem
} from '@/src/components/shared/locale-select'
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
import {dimitra43} from '@/public/images/accomodation/slug/dimitra'
import {dimitra44} from '@/public/images/accomodation/slug/dimitra'

const HEADER_MAX_HEIGHT = 128
const HEADER_MIN_HEIGHT = 64
const LOGO_MAX_SCALE = 1
const LOGO_MIN_SCALE = 0.5

const HeaderNavigation: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [hoverCardOpen, setHoverCardOpen] = React.useState(false)
  const m = useTranslations<'Metadata.Pages'>()
  const t = useTranslations<'Components.LocaleSelect'>()
  const locale = useLocale()
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
            className='flex gap-4'
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
                >
                  {m('accomodation.root')}
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
                      data-id='1'
                      href='/accomodation/georgia'
                      onClick={() => setHoverCardOpen(false)}
                    >
                      <article className='p-3 space-y-1 rounded hover:bg-surface-3 transition'>
                        <CustomImage
                          className='aspect-square object-cover rounded'
                          src={dimitra43}
                          alt='Georgia card image'
                        />
                        <Typography variant='h5'>{'Georgia'}</Typography>
                        <Typography variant='small'>
                          {m('accomodation.georgia-caption')}
                        </Typography>
                      </article>
                    </Link>
                    <Link
                      data-id='2'
                      href='/accomodation/dimitra'
                      onClick={() => setHoverCardOpen(false)}
                    >
                      <article className='p-3 space-y-1 rounded hover:bg-surface-3 transition'>
                        <CustomImage
                          className='aspect-square object-cover rounded'
                          src={dimitra44}
                          alt='Dimitra card image'
                        />
                        <Typography variant='h5'>{'Dimitra'}</Typography>
                        <Typography variant='small'>
                          {m('accomodation.dimitra-caption')}
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
            <DrawerContent className='w-3/4'>
              <div className='p-8 h-full grid grid-rows-[1fr,auto]'>
                <VisuallyHidden>
                  <DrawerTitle>{'Sidebar navigation menu'}</DrawerTitle>
                </VisuallyHidden>
                <nav
                  aria-label='Mobile navigation bar'
                  className='flex'
                >
                  <ul
                    aria-label='Mobile navigation bar'
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
                        <CollapsibleContent asChild>
                          <ul
                            className='ml-2 pl-4 space-y-2 relative before:absolute before:h-[calc(100%-16px)] before:w-px before:top-1/2 before:-translate-y-1/2 before:left-0 before:bg-surface-3'
                            role='menu'
                          >
                            <li
                              className='pt-2'
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
                    top: useBoundedTransform([24, 12])
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

const NavLink: React.FC<
  React.ComponentPropsWithRef<typeof Link> & {isActive: boolean}
> = ({isActive, draggable = false, role = 'menuitem', children, ...props}) => {
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
