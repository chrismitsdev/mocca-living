'use client'

import * as React from 'react'
import {motion, useTransform, useMotionTemplate} from 'framer-motion'
import {MenuIcon, XIcon} from 'lucide-react'
import {useBoundedScroll} from '@/hooks/useBoundedScroll'
import {usePathname, Link} from '@/navigation'
import {Typography} from '@/components/ui/typography'
import {Container} from '@/components/shared/container'
import {VisuallyHidden} from '@/components/ui/visually-hidden'
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
import {cn} from '#/lib/utils'

type NavigationLink = {
  label: string
  href: string
}

type HeaderNavigationProps = {
  links: NavigationLink[]
}

const HEADER_MAX_HEIGHT = 128
const HEADER_MIN_HEIGHT = 64
const LOGO_MAX_SCALE = 1
const LOGO_MIN_SCALE = 0.5

function HeaderNavigation({links}: HeaderNavigationProps) {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const pathname = usePathname()
  const {scrollYBoundedProgress} = useBoundedScroll(250)

  const headerLinks = React.useMemo(
    function () {
      return links.map(({href, label}) => (
        <HeaderLink
          key={href}
          href={href}
          isActive={pathname === href}
          onClick={() => setDrawerOpen(false)}
          role='menuitem'
        >
          {label}
        </HeaderLink>
      ))
    },
    [links, pathname]
  )

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
        borderBottomColor: useMotionTemplate`rgb(
          ${useTransform(scrollYBoundedProgress, [0, 1], [0, 221])}
          ${useTransform(scrollYBoundedProgress, [0, 1], [0, 200])}
          ${useTransform(scrollYBoundedProgress, [0, 1], [0, 162])} /
          ${useTransform(scrollYBoundedProgress, [0, 1], [0.08, 1])}
        )`,
        backgroundColor: useMotionTemplate`rgb(
          ${useTransform(scrollYBoundedProgress, [0, 1], [0, 221])}
          ${useTransform(scrollYBoundedProgress, [0, 1], [0, 200])}
          ${useTransform(scrollYBoundedProgress, [0, 1], [0, 162])} /
          ${useTransform(scrollYBoundedProgress, [0, 1], [0.24, 1])}
        )`,
        boxShadow: useMotionTemplate`
          0px
          ${useTransform(scrollYBoundedProgress, [0, 1], [0, 4])}px
          ${useTransform(scrollYBoundedProgress, [0, 1], [0, 12])}px
          -4px
          rgba(69, 50, 39, 0.24)
        `,
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
                key={href}
                role='none'
              >
                <HeaderLink
                  href={href}
                  isActive={pathname === href}
                  onClick={() => setDrawerOpen(false)}
                  role='menuitem'
                  {...(pathname === href ? {'aria-current': 'page'} : {})}
                >
                  {label}
                </HeaderLink>
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
            <DrawerContent>
              <VisuallyHidden>
                <DrawerTitle>{'Header navigation menu'}</DrawerTitle>
              </VisuallyHidden>
              <div className='h-full grid grid-rows-[repeat(3,_min-content)] place-content-center'>
                {headerLinks}
              </div>
              <DrawerClose asChild>
                <motion.button
                  style={{
                    padding: '8px',
                    position: 'absolute',
                    right: '16px',
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

function HeaderLink({
  isActive,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  isActive: boolean
}) {
  return (
    <Link
      className={cn('py-2 inline-block text-center', isActive && 'font-bold')}
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

export {HeaderNavigation}
