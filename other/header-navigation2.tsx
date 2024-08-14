'use client'

import * as React from 'react'
import {usePathname, Link} from '@/navigation'
import {Typography} from '@/components/ui/typography'
import {Container} from '@/components/shared/container'
import {VisuallyHidden} from '@/components/ui/visually-hidden'
import {LogoSimple} from '@/components/ui/logo-simple'
import {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerTitle,
  DrawerClose
} from '@/components/ui/drawer'
import {HamburgerMenuIcon, Cross2Icon} from '@radix-ui/react-icons'
import {cn} from '#/lib/utils'
import {useBoundedScrollDiff} from '@/hooks/useBoundedScrollDiff'
import {motion, useTransform} from 'framer-motion'

type NavigationLink = {
  label: string
  href: string
}

type HeaderNavigationProps = {
  links: NavigationLink[]
}

const HEADER_MAX_HEIGHT = 128
const HEADER_MIN_HEIGHT = 64

function HeaderNavigation2({links}: HeaderNavigationProps) {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const pathname = usePathname()
  const {scrollYBoundedProgress} = useBoundedScrollDiff(100)

  const headerLinks = links.map(({href, label}) => (
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

  return (
    <motion.header
      style={{
        display: 'flex',
        alignItems: 'center',
        position: 'fixed',
        insetInline: '0px',
        zIndex: '1',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(69, 50, 39, 0.1)',
        color: 'var(--primary-foreground)',
        background: 'linear-gradient(rgba(69, 50, 39, 0.9), transparent)',
        backgroundOrigin: 'border-box',
        boxShadow: '0px 0px 0px -4px rgba(69, 50, 39, 0.24)',
        borderEndEndRadius: '2px',
        borderEndStartRadius: '2px',
        height: useTransform(scrollYBoundedProgress, [0, 1], [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT])
      }}
    >
      <Container className='px-4 h-[inherit] flex justify-between items-center gap-2 md:px-3'>
        <motion.div style={{scale: useTransform(scrollYBoundedProgress, [0, 1], [1, 0.5])}}>
          <Link href='/'>
            <LogoSimple
              width={51}
              height={80}
            />
          </Link>
        </motion.div>

        <nav className='hidden sm:block'>
          <ul
            className='hidden items-center gap-4 md:flex'
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
        </nav>

        <Drawer
          direction='right'
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          noBodyStyles
        >
          <DrawerTrigger asChild>
            <motion.button
              className='sm:hidden'
              style={{
                padding: '8px',
                translateY: useTransform(scrollYBoundedProgress, [0, 1], [-20, 0])
              }}
            >
              <HamburgerMenuIcon
                width={24}
                height={24}
              />
            </motion.button>
          </DrawerTrigger>
          <DrawerPortal>
            <DrawerOverlay className='z-10' />
            <DrawerContent className='p-8 fixed top-0 right-0 z-10 w-full h-full bg-surface-2'>
              <VisuallyHidden>
                <DrawerTitle>{'Header navigation menu'}</DrawerTitle>
              </VisuallyHidden>
              <div className='h-full grid grid-rows-[repeat(3,_min-content)] place-content-center'>
                {headerLinks}
              </div>
              <DrawerClose className='p-2 absolute top-6 right-4 block text-primary'>
                <Cross2Icon
                  width={24}
                  height={24}
                />
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
      className={cn('py-1 text-center', isActive && 'font-bold')}
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

HeaderNavigation2.displayName = 'HeaderNavigation2'

export {HeaderNavigation2}
