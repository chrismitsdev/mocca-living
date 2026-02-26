'use client'

import {GlobeIcon} from 'lucide-react'
import {type Locale, useLocale, useTranslations} from 'next-intl'
import * as React from 'react'
import {BulgarianFlag} from '@/src/components/flags/bulgarian-flag'
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
        <Spinner className='h-4 w-4' />
        <span>{t('loading')}</span>
      </>
    )
  } else {
    renderedTrigger = (
      <>
        <GlobeIcon className='h-4 w-4' />
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
      <SelectTrigger className='min-w-40'>
        <div className='flex items-center gap-1.5 grow'>{renderedTrigger}</div>
      </SelectTrigger>
      <SelectPortal>
        <SelectContent>
          <SelectViewport>
            <SelectItem value='en'>
              <EnglishFlag />
              <SelectItemText>{t('label', {country: 'en'})}</SelectItemText>
            </SelectItem>
            <SelectItem value='el'>
              <GreekFlag />
              <SelectItemText>{t('label', {country: 'el'})}</SelectItemText>
            </SelectItem>
            <SelectItem value='tr'>
              <TurkishFlag />
              <SelectItemText>{t('label', {country: 'tr'})}</SelectItemText>
            </SelectItem>
            <SelectItem value='bg'>
              <BulgarianFlag />
              <SelectItemText>{t('label', {country: 'bg'})}</SelectItemText>
            </SelectItem>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </Select>
  )
}

LocaleSwitcher.displayName = 'LocaleSwitcher'

export {LocaleSwitcher}
