import {Content, List, Root, Trigger} from '@radix-ui/react-tabs'
import {cn} from '@/src/lib/utils'

function Tabs({className, ...props}: React.ComponentPropsWithRef<typeof Root>) {
  return (
    <Root
      className={cn('bg-surface-2 border border-border', className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof List>) {
  return (
    <List
      className={cn('flex items-center border-b border-b-border', className)}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Trigger>) {
  return (
    <Trigger
      className={cn(
        'p-4 flex-1 bg-surface-3 hover:bg-surface-2 data-active:bg-surface-2 data-active:font-bold sm:px-6',
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Content>) {
  return (
    <Content
      className={cn('px-4 py-6 space-y-6 sm:px-6 sm:py-8', className)}
      {...props}
    />
  )
}

Tabs.displayName = 'Tabs'
TabsList.displayName = 'TabsList'
TabsTrigger.displayName = 'TabsTrigger'
TabsContent.displayName = 'TabsContent'

export {Tabs, TabsContent, TabsList, TabsTrigger}
