'use client'

import {GlobeIcon} from 'lucide-react'
import {type Locale, useLocale, useTranslations} from 'next-intl'
import * as React from 'react'
import {EnglishFlag} from '@/src/components/flags/english-flag'
import {GreekFlag} from '@/src/components/flags/greek-flag'
import {TurkishFlag} from '@/src/components/flags/turkish-flag'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectPortal,
  SelectTrigger,
  SelectValue,
  SelectViewport
} from '@/src/components/ui/select'
import {Spinner} from '@/src/components/ui/spinner'
import {usePathname, useRouter} from '@/src/i18n/navigation'

interface LocaleSwitcherProps {
  scrollTop?: boolean
}

const LocaleSwitcher: React.FC<LocaleSwitcherProps> = ({scrollTop = false}) => {
  const [isPending, startTransition] = React.useTransition()
  const t = useTranslations('Components.LocaleSwitcher')
  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale()

  const onValueChange = (value: Locale) => {
    startTransition(() => {
      router.replace(pathname, {locale: value, scroll: scrollTop})
    })
  }

  let renderedTrigger: React.JSX.Element

  if (isPending) {
    renderedTrigger = (
      <>
        <Spinner className='h-4 w-4 mt-0.5' />
        <span>{t('loading')}</span>
      </>
    )
  } else {
    renderedTrigger = (
      <>
        <GlobeIcon className='h-4 w-4 mt-0.5' />
        <SelectValue />
      </>
    )
  }

  return (
    <Select
      value={locale}
      onValueChange={onValueChange}
      disabled={isPending}
    >
      <SelectTrigger className='min-w-37.5'>
        <div className='flex items-center gap-1.5 grow'>{renderedTrigger}</div>
      </SelectTrigger>
      <SelectPortal>
        <SelectContent>
          <SelectViewport>
            <SelectItem value='en'>
              <EnglishFlag className='mt-0.5' />
              <SelectItemText>{t('label', {country: 'en'})}</SelectItemText>
            </SelectItem>
            <SelectItem value='gr'>
              <GreekFlag className='mt-0.5' />
              <SelectItemText>{t('label', {country: 'gr'})}</SelectItemText>
            </SelectItem>
            <SelectItem value='tr'>
              <TurkishFlag className='mt-0.5' />
              <SelectItemText>{t('label', {country: 'tr'})}</SelectItemText>
            </SelectItem>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </Select>
  )
}

LocaleSwitcher.displayName = 'LocaleSwitcher'

export {LocaleSwitcher}
