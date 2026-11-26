'use client'

import {
  IconCurrencyDinar,
  IconCurrencyDollar,
  IconCurrencyEuro,
  IconCurrencyLeu,
  IconCurrencyLira,
  IconCurrencyPound,
  type TablerIcon
} from '@tabler/icons-react'
import {useFormatter, useTranslations} from 'next-intl'
import {useEffect, useId, useState} from 'react'
import {Section} from '@/src/components/shared/section'
import {Input} from '@/src/components/ui/input'
import {Label} from '@/src/components/ui/label'
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
import {Typography} from '@/src/components/ui/typography'
import {
  CURRENCIES,
  type Currency,
  isCurrency,
  parseAmount,
  type Rates
} from '@/src/lib/guest-app/currency'

// The guest's last choice of currency, kept on their device
const STORAGE_KEY = 'guest-app:currency'

// Fixed symbols: Intl's vary by language (e.g. "TRY" in Bulgarian)
const CURRENCY_DISPLAY: Record<Currency, {icon: TablerIcon; symbol: string}> = {
  TRY: {icon: IconCurrencyLira, symbol: '₺'},
  RSD: {icon: IconCurrencyDinar, symbol: 'din'},
  RON: {icon: IconCurrencyLeu, symbol: 'lei'},
  GBP: {icon: IconCurrencyPound, symbol: '£'},
  USD: {icon: IconCurrencyDollar, symbol: '$'}
}

/** Which of the two fields the guest last typed in, and what they typed */
type Typed = {field: 'eur' | 'other'; text: string}

function CurrencyConverter({rates}: {rates: Rates}) {
  const t = useTranslations('Pages.guest-app.currency')
  const format = useFormatter()
  const pickerId = useId()
  const [currency, setCurrency] = useState<Currency>('TRY')
  // The field the guest last typed in keeps their text; the other one shows
  // the conversion. Prices in Greece are in euros, so euros come first
  const [typed, setTyped] = useState<Typed>({field: 'eur', text: '100'})

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (isCurrency(saved)) setCurrency(saved)
  }, [])

  function choose(next: string) {
    if (!isCurrency(next)) return
    setCurrency(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }

  if (CURRENCIES.every((code) => rates[code] === null)) {
    return (
      <Section className='pt-8 sm:pt-12'>
        <Typography>{t('unavailable')}</Typography>
      </Section>
    )
  }

  const rate = rates[currency]
  const amount = parseAmount(typed.text)
  const invalid = Number.isNaN(amount)
  const converted =
    amount === null || invalid || !rate
      ? ''
      : format.number(
          typed.field === 'eur' ? amount * rate.rate : amount / rate.rate,
          {maximumFractionDigits: 2, useGrouping: false}
        )
  const fieldValue = (field: Typed['field']) =>
    field === typed.field ? typed.text : converted

  return (
    <Section className='pt-8 sm:pt-12'>
      <div className='space-y-6'>
        <div className='p-4 space-y-4 bg-surface-2 border border-surface-3 sm:p-6'>
          <AmountField
            label={t('eur')}
            icon={IconCurrencyEuro}
            value={fieldValue('eur')}
            invalid={invalid && typed.field === 'eur'}
            onChange={(text) => setTyped({field: 'eur', text})}
          />
          <div className='space-y-1'>
            <Label htmlFor={pickerId}>{t('currency-label')}</Label>
            <Select
              value={currency}
              onValueChange={choose}
            >
              <SelectTrigger
                id={pickerId}
                className='py-3.75 px-4 inline-full bg-surface-3 border-surface-4 hover:bg-surface-3 focus-visible:bg-surface-3'
              >
                <SelectValue />
              </SelectTrigger>
              <SelectPortal>
                <SelectContent>
                  <SelectViewport>
                    {CURRENCIES.map((code) => (
                      <SelectItem
                        key={code}
                        value={code}
                      >
                        <SelectItemText>
                          {t(`currencies.${code}`)} ({code})
                        </SelectItemText>
                      </SelectItem>
                    ))}
                  </SelectViewport>
                </SelectContent>
              </SelectPortal>
            </Select>
          </div>
          {rate ? (
            <>
              <AmountField
                label={t(`currencies.${currency}`)}
                icon={CURRENCY_DISPLAY[currency].icon}
                value={fieldValue('other')}
                invalid={invalid && typed.field === 'other'}
                onChange={(text) => setTyped({field: 'other', text})}
              />
              <Typography variant='h4'>
                1 € ={' '}
                {format.number(rate.rate, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}{' '}
                {CURRENCY_DISPLAY[currency].symbol}
              </Typography>
            </>
          ) : (
            <Typography>{t('currency-unavailable')}</Typography>
          )}
        </div>
        <div className='space-y-2'>
          {rate && (
            <Typography
              className='text-surface-5'
              variant='small'
            >
              {t(`source-${rate.source}`, {
                date: format.dateTime(new Date(`${rate.date}T00:00:00Z`), {
                  dateStyle: 'long',
                  timeZone: 'UTC'
                })
              })}
            </Typography>
          )}
          <Typography
            className='text-surface-5'
            variant='small'
          >
            {t('disclaimer')}
          </Typography>
        </div>
      </div>
    </Section>
  )
}

type AmountFieldProps = {
  label: string
  icon: TablerIcon
  value: string
  invalid: boolean
  onChange: (text: string) => void
}

function AmountField({
  label,
  icon,
  value,
  invalid,
  onChange
}: AmountFieldProps) {
  const t = useTranslations('Pages.guest-app.currency')
  const id = useId()

  return (
    <div className='space-y-1'>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        icon={icon}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        inputMode='decimal'
        autoComplete='off'
        maxLength={15}
        error={invalid}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? `${id}-error` : undefined}
      />
      {invalid && (
        <Typography
          id={`${id}-error`}
          className='text-danger'
          variant='small'
        >
          {t('invalid')}
        </Typography>
      )}
    </div>
  )
}

export {CurrencyConverter}
