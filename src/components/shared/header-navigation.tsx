'use client'

import * as React from 'react'
import Image from 'next/image'
import {usePathname, Link} from '@/navigation'
import {Typography} from '@/components/ui/typography'
import {Container} from '@/components/shared/container'
import {VisuallyHidden} from '@/components/ui/visually-hidden'
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
import {HamburgerMenuIcon, Cross2Icon} from '@radix-ui/react-icons'
import logoSimple from '#/public/logos/mocca-logo-simple.svg'

type NavigationLink = {
  label: string
  href: string
}

type HeaderNavigationProps = {
  links: NavigationLink[]
}

function HeaderNavigation({links}: HeaderNavigationProps) {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const pathname = usePathname()

  const headerLinks = links.map(({href, label}) => (
    <HeaderLink
      key={href}
      href={href}
      isActive={pathname === href}
      onClick={() => setDrawerOpen(false)}
    >
      {label}
    </HeaderLink>
  ))

  return (
    <header className='py-6 sticky top-0 z-[1] bg-surface-1'>
      <Container>
        <div className='flex justify-between items-center gap-2'>
          <Link href='/'>
            <Image
              className='w-auto h-20'
              priority
              src={logoSimple}
              alt='Mocca Living header logo'
            />
          </Link>

          <nav className='flex self-start md:self-auto'>
            <div className='hidden items-center gap-4 md:flex'>{headerLinks}</div>
            <Drawer
              direction='right'
              open={drawerOpen}
              onOpenChange={setDrawerOpen}
            >
              <DrawerTrigger asChild>
                <button className='p-2 block text-primary md:hidden'>
                  <HamburgerMenuIcon
                    width={24}
                    height={24}
                  />
                </button>
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
                  <DrawerClose className='p-2 absolute top-6 right-3 block text-primary'>
                    <Cross2Icon
                      width={24}
                      height={24}
                    />
                  </DrawerClose>
                </DrawerContent>
              </DrawerPortal>
            </Drawer>
          </nav>
        </div>
      </Container>
    </header>
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
      className={cn('py-1 text-center', isActive && 'font-semibold')}
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
