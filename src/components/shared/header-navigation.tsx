'use client'

import * as React from 'react'
import {usePathname, Link} from '@/navigation'
import {Typography} from '@/components/ui/typography'
import {cn} from '#/lib/utils'

type NavigationLink = {
  label: string
  href: string
}

type HeaderNavigationProps = {
  links: NavigationLink[]
}

function HeaderNavigation({links}: HeaderNavigationProps) {
  const pathname = usePathname()

  return (
    <nav className='flex gap-8'>
      {links.map(link => (
        <Link 
          key={link.href}
          className={cn(
            'py-1 relative text-center duration-500 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-foreground after:scale-x-0 after:duration-300',
            pathname === link.href && 'font-semibold after:scale-x-100'
          )}
          href={link.href}
        >
          <Typography variant='small' className='uppercase'>
            {link.label}
          </Typography>
        </Link>
      ))}
    </nav>
  )
}

HeaderNavigation.displayName = 'HeaderNavigation'

export {HeaderNavigation}