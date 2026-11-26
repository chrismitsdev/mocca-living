'use client'

import {IconCurrencyEuro, IconCurrencyLira} from '@tabler/icons-react'
import {useFormatter, useTranslations} from 'next-intl'
import {useId, useState} from 'react'
import {Section} from '@/src/components/shared/section'
import {Input} from '@/src/components/ui/input'
import {Label} from '@/src/components/ui/label'
import {Typography} from '@/src/components/ui/typography'
import {type EurTryRate, parseAmount} from '@/src/lib/guest-app/currency'

type Currency = 'eur' | 'try'

const ICON = {eur: IconCurrencyEuro, try: IconCurrencyLira}

function CurrencyConverter({rate}: {rate: EurTryRate}) {
  const t = useTranslations('Pages.guest-app.currency')
  const format = useFormatter()
  // The field the guest last typed in keeps their text; the other one shows
  // the conversion. Prices in Greece are in euros, so euros come first
  const [typed, setTyped] = useState<{currency: Currency; text: string}>({
    currency: 'eur',
    text: '100'
  })

  if (!rate.ok) {
    return (
      <Section className='pt-8 sm:pt-12'>
        <Typography>{t('unavailable')}</Typography>
      </Section>
    )
  }

  const amount = parseAmount(typed.text)
  const invalid = Number.isNaN(amount)
  const converted =
    amount === null || invalid
      ? ''
      : format.number(
          typed.currency === 'eur' ? amount * rate.rate : amount / rate.rate,
          {maximumFractionDigits: 2, useGrouping: false}
        )
  const fieldValue = (currency: Currency) =>
    currency === typed.currency ? typed.text : converted

  return (
    <Section className='pt-8 sm:pt-12'>
      <div className='space-y-6'>
        <div className='p-4 space-y-4 bg-surface-2 border border-surface-3 sm:p-6'>
          {(['eur', 'try'] as const).map((currency) => (
            <AmountField
              key={currency}
              currency={currency}
              value={fieldValue(currency)}
              invalid={invalid && currency === typed.currency}
              onChange={(text) => setTyped({currency, text})}
            />
          ))}
          <Typography variant='h4'>
            1 € ={' '}
            {format.number(rate.rate, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}{' '}
            ₺
          </Typography>
        </div>
        <div className='space-y-2'>
          <Typography
            className='text-surface-5'
            variant='small'
          >
            {t('source', {
              date: format.dateTime(new Date(`${rate.date}T00:00:00Z`), {
                dateStyle: 'long',
                timeZone: 'UTC'
              })
            })}
          </Typography>
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
  currency: Currency
  value: string
  invalid: boolean
  onChange: (text: string) => void
}

function AmountField({currency, value, invalid, onChange}: AmountFieldProps) {
  const t = useTranslations('Pages.guest-app.currency')
  const id = useId()

  return (
    <div className='space-y-1'>
      <Label htmlFor={id}>{t(currency)}</Label>
      <Input
        id={id}
        icon={ICON[currency]}
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
