import * as React from 'react'
import {
  Root,
  List,
  Item,
  Trigger,
  Link as RadixNavLink,
  Viewport,
  Content,
  Indicator
} from '@radix-ui/react-navigation-menu'
import {cva} from 'class-variance-authority'
import {cn} from '#/lib/utils'

const navMenuTriggerStyle = cva([
  'px-2',
  'py-1.5',
  'inline-flex',
  'gap-1',
  'items-center',
  'justify-center',
  'rounded',
  'bg-background',
  'text-sm',
  'uppercase',
  'font-semibold',
  'transition-colors',
  'focus:bg-accent',
  'focus:text-accent-foreground',
  'focus:outline-none',
  'disabled:pointer-events-none',
  'disabled:opacity-50',
  'hover:bg-primary',
  'hover:text-primary-foreground',
  'data-active:bg-primary',
  'data-open:bg-primary',
  'data-active:text-primary-foreground',
  'data-open:text-primary-foreground',
  'group'
])

const NavMenu = React.forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root>
>(({className, children, delayDuration = 0, ...props}, ref) => (
  <Root
    className={cn('relative flex items-center justify-center w-full z-[1]', className)}
    delayDuration={delayDuration}
    ref={ref}
    {...props}
  >
    {children}
    <NavMenuViewportWrapper>
      <NavMenuViewport />
    </NavMenuViewportWrapper>
  </Root>
))

const NavMenuList = React.forwardRef<
  React.ElementRef<typeof List>,
  React.ComponentPropsWithoutRef<typeof List>
>(({className, ...props}, ref) => (
  <List
    className={cn(
      'p-1 flex items-center justify-center gap-1 list-none bg-surface-2 rounded group',
      className
    )}
    ref={ref}
    {...props}
  />
))

const NavMenuItem = Item

const NavMenuTrigger = React.forwardRef<
  React.ElementRef<typeof Trigger>,
  React.ComponentPropsWithoutRef<typeof Trigger>
>(({className, ...props}, ref) => (
  <Trigger
    className={cn(navMenuTriggerStyle(), className)}
    ref={ref}
    {...props}
  />
))

const NavMenuLink = React.forwardRef<
  React.ElementRef<typeof RadixNavLink>,
  React.ComponentPropsWithoutRef<typeof RadixNavLink>
>(({className, ...props}, ref) => (
  <RadixNavLink
    className={cn(navMenuTriggerStyle(), 'cursor-pointer', className)}
    ref={ref}
    {...props}
  />
))

const NavMenuViewportWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
  <div
    className={cn('absolute left-0 top-full flex justify-center w-full', className)}
    ref={ref}
    {...props}
  />
))

const NavMenuViewport = React.forwardRef<
  React.ElementRef<typeof Viewport>,
  React.ComponentPropsWithoutRef<typeof Viewport>
>(({className, ...props}, ref) => (
  <Viewport
    className={cn(
      'mt-3 relative h-[var(--radix-navigation-menu-viewport-height)] w-full bg-surface-2 origin-[top_center] overflow-hidden rounded shadow data-open:animate-nav-link-open data-closed:animate-nav-link-closed sm:w-[var(--radix-navigation-menu-viewport-width)]',
      className
    )}
    ref={ref}
    {...props}
  />
))

// Animations here are for the content area when switching
// between multiple NavMenuTrigger components that have a content
const NavMenuContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(({className, ...props}, ref) => (
  <Content
    className={cn(
      'absolute left-0 top-0 w-full data-from-start:animate-in data-from-end:animate-in data-from-start:fade-in data-from-end:fade-in data-from-start:slide-in-from-left-52 data-to-start:animate-out data-to-end:animate-out  data-to-start:fade-out data-to-end:fade-out data-from-end:slide-in-from-right-52 data-to-end:slide-out-to-right-52 data-to-start:slide-out-to-left-52 sm:w-auto',
      className
    )}
    ref={ref}
    {...props}
  />
))

const NavMenuIndicator = React.forwardRef<
  React.ElementRef<typeof Indicator>,
  React.ComponentPropsWithoutRef<typeof Indicator>
>(({className, ...props}, ref) => (
  <Indicator
    className={cn(
      'top-full flex items-end justify-center h-3 overflow-hidden transition-all z-[1] data-visible:animate-ghost-in data-hidden:animate-ghost-out',
      className
    )}
    ref={ref}
    {...props}
  >
    <div className='relative top-[50%] w-3 h-3 rotate-45 bg-surface-2 shadow [border-top-left-radius:var(--radius)]' />
  </Indicator>
))

NavMenu.displayName = 'NavMenu'
NavMenuList.displayName = 'NavMenuList'
// NavMenuItem.displayName = 'NavMenuItem'
NavMenuLink.displayName = 'NavMenuLink'
NavMenuTrigger.displayName = 'NavMenuTrigger'
NavMenuContent.displayName = 'NavMenuContent'
NavMenuViewportWrapper.displayName = 'NavMenuViewportWrapper'
NavMenuViewport.displayName = 'NavMenuViewport'
NavMenuIndicator.displayName = 'NavMenuIndicator'

export {
  navMenuTriggerStyle,
  NavMenu,
  NavMenuList,
  NavMenuItem,
  NavMenuTrigger,
  NavMenuLink,
  NavMenuViewport,
  NavMenuContent,
  NavMenuIndicator
}
