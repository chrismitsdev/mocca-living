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

type LocaleSwitcherSelectProps = {
  defaultLocale: string 
  placeholder: string
  children: React.ReactNode
}

type LocaleSwitcherSelectItemProps = {
  value: keyof IntlMessages['Components']['LocaleSwitcherSelect']['values']
  children: React.ReactNode
}

function LocaleSwitcherSelect({defaultLocale, placeholder, children}: LocaleSwitcherSelectProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = React.useTransition()

  function onSelectChange(locale: keyof IntlMessages['Components']['LocaleSwitcherSelect']['values']) {
    startTransition(function() {
      router.replace(pathname, {locale})
    })
  }
  
  return (
    <Select 
      defaultValue={defaultLocale} 
      onValueChange={onSelectChange}
      disabled={isPending}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
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

function LocaleSwitcherSelectItem({value, children}: LocaleSwitcherSelectItemProps) {
  return <SelectItem value={value}>{children}</SelectItem>
}

LocaleSwitcherSelect.displayName = 'LocaleSwitcherSelect'
LocaleSwitcherSelectItem.displayName = 'LocaleSwitcherSelectItem'

export {LocaleSwitcherSelect, LocaleSwitcherSelectItem}