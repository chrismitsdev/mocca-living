import {Link, usePathname} from '@/src/i18n/navigation'
import {cn} from '@/src/lib/utils'

type ListItemLinkProps = React.ComponentPropsWithRef<'li'> & {
  className?: string
  label: string
  href: string
}

function ListItemLink({label, href, children, ...props}: ListItemLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname.startsWith(`${href}/`)

  return (
    <li {...props}>
      <Link
        aria-current={isActive ? 'page' : undefined}
        className={cn(
          'p-1.5 text-sm uppercase underline-offset-4',
          isActive && 'font-bold underline decoration-2'
        )}
        href={href}
      >
        {label}
      </Link>

      {children}
    </li>
  )
}

export {ListItemLink}
