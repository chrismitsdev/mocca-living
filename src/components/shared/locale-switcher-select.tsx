'use client'

import * as React from 'react'
import {useRouter, usePathname} from '@/navigation'
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
}

function LocaleSelect({loadingText, className, placeholder, children,...props}: LocaleSelectProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = React.useTransition()

  function onSelectChange(locale: keyof IntlMessages['Components']['LocaleSelect']['values']) {
    startTransition(function() {
      router.replace(pathname, {locale})
    })
  }
  
  return (
    <Select disabled={isPending} onValueChange={onSelectChange} {...props}>
      <SelectTrigger className={className}>
        {isPending
          ? (
            <span className='flex items-center gap-2'>
              <Spinner className='h-4 w-4' />
              <span>{loadingText}</span>
            </span>
          )
          : <SelectValue placeholder={placeholder} />
        }
      </SelectTrigger>
      <SelectPortal>
        <SelectContent>
          <SelectViewport>
            {children}
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </Select>
  )
}

function LocaleSelectItem({...props}: React.ComponentPropsWithoutRef<typeof SelectItem>) {
  return <SelectItem {...props} />
}

LocaleSelect.displayName = 'LocaleSelect'
LocaleSelectItem.displayName = 'LocaleSelectItem'

export {LocaleSelect, LocaleSelectItem}