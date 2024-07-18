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

type LocaleSwitcherSelectProps = React.ComponentPropsWithoutRef<typeof Select> & {
  placeholder: string
  className?: string
}

type LocaleSwitcherSelectItemProps = React.ComponentPropsWithoutRef<typeof SelectItem>

function LocaleSwitcherSelect({className, defaultValue, placeholder, children}: LocaleSwitcherSelectProps) {
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
      defaultValue={defaultValue} 
      onValueChange={onSelectChange}
      disabled={isPending}
    >
      <SelectTrigger className={className}>
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

function LocaleSwitcherSelectItem({...props}: LocaleSwitcherSelectItemProps) {
  return <SelectItem {...props} />
}

LocaleSwitcherSelect.displayName = 'LocaleSwitcherSelect'
LocaleSwitcherSelectItem.displayName = 'LocaleSwitcherSelectItem'

export {LocaleSwitcherSelect, LocaleSwitcherSelectItem}