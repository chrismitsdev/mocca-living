'use client'

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

const flags = {
  bg: BulgarianFlag,
  el: GreekFlag,
  tr: TurkishFlag,
  en: EnglishFlag
} satisfies Record<Locale, React.ComponentType<CustomIconProps>>

function LocaleSwitcher({scrollTop = false}: LocaleSwitcherProps) {
  const [isPending, startTransition] = React.useTransition()
  const t = useTranslations('Components.LocaleSwitcher')
  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale()
  const Flag = flags[locale]

  const onValueChange = (value: Locale) => {
    startTransition(() => {
      router.replace(pathname, {locale: value, scroll: scrollTop})
    })
  }

  let renderedTrigger: React.JSX.Element

  if (isPending) {
    renderedTrigger = (
      <>
        <Spinner className='size-5' />
        <span>{t('loading')}</span>
      </>
    )
  } else {
    renderedTrigger = (
      <>
        <Flag />
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
      <SelectTrigger className='min-w-44'>
        <span className='flex items-center gap-1.5 grow'>
          {renderedTrigger}
        </span>
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
