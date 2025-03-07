'use client'

import * as React from 'react'
import {useTranslations, useLocale} from 'next-intl'
import {GlobeIcon} from 'lucide-react'
import {locales} from '@/src/i18n/routing'
import {usePathname, useRouter} from '@/src/i18n/navigation'
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

interface LocaleSwitcherProps {
  scrollTop?: boolean
}

const ClientLocaleSwitcher: React.FC<LocaleSwitcherProps> = ({
  scrollTop = false
}) => {
  const [isPending, startTransition] = React.useTransition()
  const t = useTranslations<'Components.LocaleSwitcher'>()
  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale()

  function onValueChange(value: Locale) {
    startTransition(function () {
      router.replace(pathname, {locale: value, scroll: scrollTop})
    })
  }

  const renderedItems = locales.map(function (locale) {
    return (
      <SelectItem
        key={locale}
        value={locale}
      >
        <span>{t('label', {locale})}</span>
      </SelectItem>
    )
  })

  let renderedTrigger: React.JSX.Element

  if (isPending) {
    renderedTrigger = (
      <div className='flex items-center gap-2 grow'>
        <Spinner className='h-4 w-4' />
        <span>{t('loadingText')}</span>
      </div>
    )
  } else {
    renderedTrigger = (
      <div className='flex items-center gap-2  grow'>
        <GlobeIcon className='h-4 w-4' />
        <SelectValue />
      </div>
    )
  }

  return (
    <Select
      onValueChange={onValueChange}
      disabled={isPending}
      defaultValue={locale}
    >
      <SelectTrigger className='min-w-fit'>{renderedTrigger}</SelectTrigger>
      <SelectPortal>
        <SelectContent>
          <SelectViewport>{renderedItems}</SelectViewport>
        </SelectContent>
      </SelectPortal>
    </Select>
  )
}

ClientLocaleSwitcher.displayName = 'ClientLocaleSwitcher'

export {ClientLocaleSwitcher}
