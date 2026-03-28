import {Link, usePathname} from '@/src/i18n/navigation'
import {cn} from '@/src/lib/utils'

type NavigationListItemLinkProps = React.ComponentPropsWithRef<'li'> & {
  className?: string
  label: string
  href: string
}

function NavigationListItemLink({
  label,
  href,
  children,
  ...props
}: NavigationListItemLinkProps) {
  const pathname = usePathname()

  return (
    <li {...props}>
      <Link
        className={cn(
          'p-1.5 text-sm uppercase underline-offset-4',
          pathname === href && 'font-bold underline decoration-2'
        )}
        href={href}
        {...(pathname === href && {'aria-current': 'page'})}
      >
        {label}
      </Link>

      {children}
    </li>
  )
}

NavigationListItemLink.displayName = 'NavigationListItemLink'

export {NavigationListItemLink}
