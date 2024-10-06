'use client'

import * as React from 'react'
import {useTranslations, useLocale} from 'next-intl'
import {motion, useTransform, useMotionTemplate} from 'framer-motion'
import {Link, usePathname, locales} from '@/i18n/routing'
import {MenuIcon, XIcon} from 'lucide-react'
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
                  role='menuitem'
                  {...(pathname === href ? {'aria-current': 'page'} : {})}
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
            <DrawerContent className='w-full border-l-0'>
              <div className='p-8 h-full grid grid-rows-[1fr,auto]'>
                <VisuallyHidden>
                  <DrawerTitle>{'Sidebar navigation menu'}</DrawerTitle>
                </VisuallyHidden>
                <nav className='py-8 flex'>
                  <ul
                    className='my-auto space-y-6 w-full'
                    role='menubar'
                  >
                    {links.map(({href, label}) => (
                      <li
                        className='text-right'
                        role='none'
                        key={label}
                      >
                        <NavLink
                          href={href}
                          isActive={pathname === href}
                          onClick={() => setDrawerOpen(false)}
                          {...(pathname === href
                            ? {'aria-current': 'page'}
                            : {})}
                        >
                          {label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </nav>
                <LocaleSelect
                  className='w-40 place-self-end'
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
  draggable = false,
  isActive,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  isActive: boolean
}) {
  return (
    <Link
      className={cn('p-1 inline-block', isActive && 'font-bold underline')}
      draggable={draggable}
      {...props}
    >
      <Typography
        variant='small'
        className='uppercase'
      >
        {children}
      </Typography>
    </Link>
  )
}

HeaderNavigation.displayName = 'HeaderNavigation'
NavLink.displayName = 'NavLink'

export {HeaderNavigation}
