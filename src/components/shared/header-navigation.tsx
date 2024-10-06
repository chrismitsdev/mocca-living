'use client'

import * as React from 'react'
import {useTranslations, useLocale} from 'next-intl'
import {motion, useTransform, useMotionTemplate} from 'framer-motion'
import {Link, usePathname, locales} from '@/i18n/routing'
import {MenuIcon, XIcon, ChevronRight} from 'lucide-react'
import {useBoundedScroll} from '@/hooks/useBoundedScroll'
import {cn} from '#/lib/utils'
import {Container} from '@/components/shared/container'
import {Typography} from '@/components/ui/typography'
import {LogoSimple} from '@/components/logos/logo-simple'
import {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerTitle,
  DrawerClose
} from '@/components/ui/drawer'
import {LocaleSelect, LocaleSelectItem} from '@/components/shared/locale-select'
import {VisuallyHidden} from '@/components/ui/visually-hidden'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from '@/components/ui/collapsible'
import {Button} from '@/components/ui/button'

type HeaderNavigationProps = {
  links: {
    label: string
    href: string
  }[]
}

const HEADER_MAX_HEIGHT = 128
const HEADER_MIN_HEIGHT = 64
const LOGO_MAX_SCALE = 1
const LOGO_MIN_SCALE = 0.5

function HeaderNavigation({links}: HeaderNavigationProps) {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const t = useTranslations<'Components.LocaleSelect'>()
  const m = useTranslations<'Metadata.Pages'>()
  const locale = useLocale()
  const pathname = usePathname()
  const {scrollYBoundedProgress} = useBoundedScroll(250)

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
          ${useTransform(scrollYBoundedProgress, [0, 1], [0, 199])}
          ${useTransform(scrollYBoundedProgress, [0, 1], [0, 180])}
          ${useTransform(scrollYBoundedProgress, [0, 1], [0, 146])} /
          ${useTransform(scrollYBoundedProgress, [0, 1], [0.08, 1])}
        )`,
        backgroundColor: useMotionTemplate`rgb(
          ${useTransform(scrollYBoundedProgress, [0, 1], [0, 221])}
          ${useTransform(scrollYBoundedProgress, [0, 1], [0, 200])}
          ${useTransform(scrollYBoundedProgress, [0, 1], [0, 162])} /
          ${useTransform(scrollYBoundedProgress, [0, 1], [0.24, 1])}
        )`,
        height: useTransform(
          scrollYBoundedProgress,
          [0, 1],
          [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT]
        )
      }}
    >
      <Container className='px-4 h-[inherit] flex justify-between items-center gap-2 md:px-3'>
        <motion.div
          style={{
            willChange: 'scale, color',
            scale: useTransform(
              scrollYBoundedProgress,
              [0, 1],
              [LOGO_MAX_SCALE, LOGO_MIN_SCALE]
            ),
            color: useMotionTemplate`rgb(
              ${useTransform(scrollYBoundedProgress, [0, 1], [231, 148])}
              ${useTransform(scrollYBoundedProgress, [0, 1], [217, 79])}
              ${useTransform(scrollYBoundedProgress, [0, 1], [190, 33])}
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
              ${useTransform(scrollYBoundedProgress, [0, 1], [231, 69])}
              ${useTransform(scrollYBoundedProgress, [0, 1], [217, 50])}
              ${useTransform(scrollYBoundedProgress, [0, 1], [190, 39])}
            )`
          }}
        >
          <ul
            className='flex items-center gap-4'
            role='menubar'
          >
            {links.map(({href, label}) => (
              <li
                key={label}
                role='none'
              >
                <NavLink
                  href={href}
                  isActive={pathname === href}
                >
                  {label}
                </NavLink>
              </li>
            ))}
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
                  ${useTransform(scrollYBoundedProgress, [0, 1], [231, 69])}
                  ${useTransform(scrollYBoundedProgress, [0, 1], [217, 50])}
                  ${useTransform(scrollYBoundedProgress, [0, 1], [190, 39])}
                )`,
                translateY: useTransform(
                  scrollYBoundedProgress,
                  [0, 1],
                  [-20, 0]
                )
              }}
            >
              <MenuIcon size={24} />
            </motion.button>
          </DrawerTrigger>
          <DrawerPortal>
            <DrawerOverlay />
            <DrawerContent className='w-2/3'>
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
                              <ChevronRight
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
                    top: useTransform(scrollYBoundedProgress, [0, 1], [24, 12])
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
      <Typography>{children}</Typography>
    </Link>
  )
}

HeaderNavigation.displayName = 'HeaderNavigation'
NavLink.displayName = 'NavLink'

export {HeaderNavigation}
