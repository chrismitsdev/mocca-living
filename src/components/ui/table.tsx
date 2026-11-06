import {cn} from '@/src/lib/utils'

function TableContainer({
  className,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={cn(
        'w-full overflow-x-auto border border-surface-3 bg-surface-2',
        className
      )}
      {...props}
    />
  )
}

function Table({className, ...props}: React.ComponentPropsWithRef<'table'>) {
  return (
    <table
      className={cn('w-full caption-bottom text-sm', className)}
      {...props}
    />
  )
}

function TableHeader({
  className,
  ...props
}: React.ComponentPropsWithRef<'thead'>) {
  return (
    <thead
      className={cn('bg-surface-3', className)}
      {...props}
    />
  )
}

function TableRow({className, ...props}: React.ComponentPropsWithRef<'tr'>) {
  return (
    <tr
      className={cn('border-b border-surface-3', className)}
      {...props}
    />
  )
}

function TableHead({className, ...props}: React.ComponentPropsWithRef<'th'>) {
  return (
    <th
      className={cn(
        'p-4 text-left align-middle font-bold whitespace-nowrap',
        className
      )}
      {...props}
    />
  )
}

function TableBody({
  className,
  ...props
}: React.ComponentPropsWithRef<'tbody'>) {
  return (
    <tbody
      className={cn('[&>tr:last-child]:border-b-0', className)}
      {...props}
    />
  )
}

function TableCell({className, ...props}: React.ComponentPropsWithRef<'td'>) {
  return (
    <td
      className={cn('px-4 py-3 align-middle', className)}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentPropsWithRef<'caption'>) {
  return (
    <caption
      className={cn('mt-4 text-sm', className)}
      {...props}
    />
  )
}

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow
}
