'use client'

import * as React from 'react'
import {GlobeIcon} from 'lucide-react'
import {useRouter, usePathname} from '@/src/i18n/navigation'
import {locales} from '@/src/i18n/routing'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectPortal,
  SelectContent,
  SelectViewport,
  SelectItem
} from '@/src/components/ui/select'
import {Spinner} from '@/src/components/ui/spinner'

interface LocaleSelectProps extends React.ComponentPropsWithRef<typeof Select> {
  loadingText: string
  className?: string
  placeholder: string
  scroll?: boolean
}

const LocaleSelect: React.FC<LocaleSelectProps> = ({
  loadingText,
  className,
  placeholder,
  scroll = false,
  children,
  ...props
}) => {
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()
  const pathname = usePathname()

  function onValueChange(locale: Locale) {
    startTransition(function () {
      router.replace(pathname, {locale, scroll})
    })
  }

  const renderedLocales = locales.map(function (locale) {
    return (
      <SelectItem
        key={locale}
        value={locale}
      ></SelectItem>
    )
  })

  return (
    <Select
      disabled={isPending}
      onValueChange={onValueChange}
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

const LocaleSelectItem: React.FC<
  React.ComponentPropsWithRef<typeof SelectItem>
> = (props) => {
  return <SelectItem {...props} />
}

LocaleSelect.displayName = 'LocaleSelect'
LocaleSelectItem.displayName = 'LocaleSelectItem'

export {LocaleSelect, LocaleSelectItem}
