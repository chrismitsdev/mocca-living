'use client'

import * as React from 'react'
import {motion, useTransform, useMotionTemplate} from 'framer-motion'
import {HamburgerMenuIcon, Cross2Icon} from '@radix-ui/react-icons'
// import {useBoundedScroll} from '@/hooks/useBoundedScroll'
import {useBoundedScrollDiff} from '@/hooks/useBoundedScrollDiff'
import {usePathname, Link} from '@/navigation'
import {Typography} from '@/components/ui/typography'
import {Container} from '@/components/shared/container'
import {VisuallyHidden} from '@/components/ui/visually-hidden'
import {LogoSimple} from '@/components/logos/logo-simple'
import {
  Sheet,
  SheetTrigger,
  SheetPortal,
  SheetOverlay,
  SheetContent,
  SheetTitle,
  SheetClose
} from '@/components/ui/sheet'
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

// Start: box-shadow: 0px 0px 0px -4px rgba(69, 50, 39, 0.24);
// End: box-shadow: 0px 4px 12px -4px rgba(69, 50, 39, 0.24);

// surface-1: rgba(231, 217, 190, 1)
// surface-2: rgba(221, 200, 162, 1)
// surface-3: rgba(199, 180, 146, 1)
// surface-4: rgba(177, 160, 130, 1)
// surface-5: rgba(155, 140, 113, 1)
// brand-9: rgba(148, 79, 33, 1)

function HeaderNavigation({links}: HeaderNavigationProps) {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const pathname = usePathname()
  const {scrollYBoundedProgress} = useBoundedScrollDiff(200)

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
        insetBlockStart: '0px',
        insetInline: '0px',
        zIndex: '1',
        backdropFilter: 'blur(4px)',
        color: useMotionTemplate`rgb(
          ${useTransform(scrollYBoundedProgress, [0, 1], [231, 148])}
          ${useTransform(scrollYBoundedProgress, [0, 1], [217, 79])}
          ${useTransform(scrollYBoundedProgress, [0, 1], [190, 33])}
        )`,
        backgroundColor: useMotionTemplate`rgb(
          ${useTransform(scrollYBoundedProgress, [0, 1], [0, 231])}
          ${useTransform(scrollYBoundedProgress, [0, 1], [0, 217])}
          ${useTransform(scrollYBoundedProgress, [0, 1], [0, 190])} / 
          ${useTransform(scrollYBoundedProgress, [0, 1], [0.24, 1])} 
        )`,
        borderBottom: '1px solid rgb(0 0 0 / 0.08)',
        boxShadow: useMotionTemplate`
          0px
          ${useTransform(scrollYBoundedProgress, [0, 1], [0, 4])}px
          ${useTransform(scrollYBoundedProgress, [0, 1], [0, 12])}px
          -4px
          rgba(69, 50, 39, 0.24)
        `,
        height: useTransform(scrollYBoundedProgress, [0, 1], [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT])
      }}
    >
      <Container className='px-4 h-[inherit] flex justify-between items-center gap-2 md:px-3'>
        <motion.div
          style={{
            scale: useTransform(scrollYBoundedProgress, [0, 1], [LOGO_MAX_SCALE, LOGO_MIN_SCALE])
          }}
        >
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

        <Sheet
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
        >
          <SheetTrigger asChild>
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
          </SheetTrigger>
          <SheetPortal>
            <SheetOverlay />
            <SheetContent>
              <VisuallyHidden>
                <SheetTitle>{'Header navigation menu'}</SheetTitle>
              </VisuallyHidden>
              <div className='h-full grid grid-rows-[repeat(3,_min-content)] place-content-center'>
                {headerLinks}
              </div>
              <SheetClose asChild>
                <motion.button
                  style={{
                    padding: '8px',
                    position: 'absolute',
                    right: '16px',
                    top: useTransform(scrollYBoundedProgress, [0, 1], [24, 12])
                  }}
                >
                  <Cross2Icon
                    width={24}
                    height={24}
                  />
                </motion.button>
              </SheetClose>
            </SheetContent>
          </SheetPortal>
        </Sheet>
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

HeaderNavigation.displayName = 'HeaderNavigation'

export {HeaderNavigation}
