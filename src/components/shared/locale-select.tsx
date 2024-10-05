'use client'

import * as React from 'react'
import {GlobeIcon} from 'lucide-react'
import {locales, useRouter, usePathname} from '@/i18n/routing'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectPortal,
  SelectContent,
  SelectViewport,
  SelectItem
} from '@/components/ui/select'
import {Spinner} from '@/components/ui/spinner'

type LocaleSelectProps = React.ComponentPropsWithoutRef<typeof Select> & {
  loadingText: string
  className?: string
  placeholder: string
  noScroll?: boolean
}

function LocaleSelect({
  loadingText,
  className,
  placeholder,
  noScroll = false,
  children,
  ...props
}: LocaleSelectProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = React.useTransition()

  function onSelectChange(locale: (typeof locales)[number]) {
    startTransition(function () {
      router.replace(pathname, {locale, scroll: !noScroll})
    })
  }

  return (
    <Select
      disabled={isPending}
      onValueChange={onSelectChange}
      {...props}
    >
      <SelectTrigger className={className}>
        {isPending ? (
          <span className='flex items-center gap-2'>
            <Spinner className='h-4 w-4' />
            <span>{loadingText}</span>
          </span>
        ) : (
          <span className='flex items-center gap-2'>
            <GlobeIcon size={16} />
            <SelectValue placeholder={placeholder} />
          </span>
        )}
      </SelectTrigger>
      <SelectPortal>
        <SelectContent>
          <SelectViewport>{children}</SelectViewport>
        </SelectContent>
      </SelectPortal>
    </Select>
  )
}

function LocaleSelectItem({
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectItem>) {
  return <SelectItem {...props} />
}

LocaleSelect.displayName = 'LocaleSelect'
LocaleSelectItem.displayName = 'LocaleSelectItem'

export {LocaleSelect, LocaleSelectItem}
