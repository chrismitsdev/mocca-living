import {Link, usePathname} from '@/src/i18n/navigation'
import {cn} from '@/src/lib/utils'

type ListItemLink = React.PropsWithChildren<{
  className?: string
  label: string
  href: string
}>

function ListItemLink({label, href, children, ...props}: ListItemLink) {
  const pathname = usePathname()
  const isActive = pathname === href

  console.log(pathname)

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
