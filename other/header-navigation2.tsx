'use client'

import * as React from 'react'
import {usePathname, Link} from '@/navigation'
import {
  NavMenu,
  NavMenuList,
  NavMenuItem,
  NavMenuTrigger,
  NavMenuContent,
  NavMenuLink,
  NavMenuIndicator
} from '@/components/ui/navigation-menu'
import {ChevronDownIcon} from '@radix-ui/react-icons'

type NavigationLink = {
  label: string
  href: string
}

type HeaderNavigationProps = {
  links: NavigationLink[]
}

function HeaderNavigation2({links}: HeaderNavigationProps) {
  const pathname = usePathname()

  return (
    <NavMenu delayDuration={0}>
      <NavMenuList>
        <NavMenuItem>
          <NavMenuLink asChild>
            <Link href={links[0].href}>{links[0].label}</Link>
          </NavMenuLink>
        </NavMenuItem>

        <NavMenuItem>
          <NavMenuTrigger asChild>
            <Link href={links[1].href}>
              <span>{links[1].label}</span>
              <ChevronDownIcon
                className='group-data-open:rotate-180 duration-150'
                width={16}
                height={16}
              />
            </Link>
          </NavMenuTrigger>
          <NavMenuContent>
            <div className='p-4 min-w-80 sm:p-6'>Hello World</div>
          </NavMenuContent>
        </NavMenuItem>

        <NavMenuItem>
          <NavMenuLink asChild>
            <Link href={links[2].href}>{links[2].label}</Link>
          </NavMenuLink>
        </NavMenuItem>

        <NavMenuIndicator />
      </NavMenuList>
    </NavMenu>
  )
}

HeaderNavigation2.displayName = 'HeaderNavigation2'

export {HeaderNavigation2}
