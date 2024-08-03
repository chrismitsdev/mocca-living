'use client'

import * as React from 'react'
import {usePathname, Link} from '@/navigation'
import {m, LazyMotion, domMax} from 'framer-motion'
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
    <LazyMotion features={domMax}>
      <nav className='flex w-80 gap-2'>
        {links.map(link => (
          <Link 
            key={link.href}
            className={cn(
              'py-1 relative flex-1 text-center duration-500',
              pathname === link.href && 'font-semibold'
            )}
            href={link.href}
          >
            {pathname === link.href && (
              <m.div 
                layoutId='active-link' 
                style={{borderRadius: 'var(--radius)'}}
                className='absolute bottom-0 left-0 w-full h-0.5 bg-brand-12' 
                transition={{
                  type: 'spring',
                  duration: 0.5
                }}
              />
            )}
            <span className='relative z-10 uppercase text-sm'>
              {link.label}
            </span>
          </Link>
        ))}
      </nav>
    </LazyMotion>
  )
}

HeaderNavigation.displayName = 'HeaderNavigation'

export {HeaderNavigation}