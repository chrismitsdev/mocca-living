'use server'

import type {Locale} from 'next-intl'
import {
  type BaseIssue,
  check,
  email,
  flatten,
  type InferOutput,
  literal,
  maxLength,
  minLength,
  nonEmpty,
  object,
  pipe,
  regex,
  safeParse,
  setSpecificMessage,
  string,
  trim
} from 'valibot'
import {sendContactForm} from '@/src/lib/send-contact-form'
import {bannedKeywordPatterns} from '@/src/lib/utils'

setSpecificMessage(string, 'Πρέπει να είναι γράμματα & αριθμοί', 'el')
setSpecificMessage(string, 'Must contain only letters & numbers', 'en')
setSpecificMessage(string, 'Yalnızca harf ve rakam içermelidir', 'tr')
setSpecificMessage(string, 'Трябва да съдържа само букви и цифри', 'bg')

setSpecificMessage(nonEmpty, 'Υποχρεωτικό πεδίο', 'el')
setSpecificMessage(nonEmpty, 'Mandatory field', 'en')
setSpecificMessage(nonEmpty, 'Zorunlu alan', 'tr')
setSpecificMessage(nonEmpty, 'Задължително поле', 'bg')

const messages = {
  minLength: {
    el: 'Tουλάχιστον 2 χαρακτήρες',
    en: 'At least 2 characters',
    tr: 'En az 2 karakter',
    bg: 'Поне 2 символа'
  },
  maxLength: {
    el: 'Μέγιστο 25 χαρακτήρες',
    en: 'Maximum 25 characters',
    tr: 'Maksimum 25 karakter',
    bg: 'Максимум 25 символа'
  },
  isEmailFormat: {
    el: 'Μη έγκυρη μορφή email',
    en: 'Invalid email format',
    tr: 'Geçersiz e-posta formatı',
    bg: 'Невалиден формат на имейл'
  },
  bannedEmail: {
    el: 'Η διεύθυνση email δεν επιτρέπεται',
    en: 'Email address is not allowed',
    tr: 'E-posta adresine izin verilmiyor',
    bg: 'Имейл адресът не е разрешен'
  },
  checkEmail: {
    el: 'Αποδεκτά email: gmail, icloud, yahoo',
    en: 'Accepted email: gmail, icloud, yahoo',
    tr: 'Kabul edilen e-posta: gmail, icloud, yahoo',
    bg: 'Приети имейли: gmail, icloud, yahoo'
  },
  checkSpam: {
    el: 'Βρέθηκε ανεπιθύμητο μήνυμα, δοκιμάστε να αναδιατυπώσετε.',
    en: 'Spam-like message detected, please try rephrasing.',
    tr: 'İstenmeyen bir mesaj tespit edildi, lütfen yeniden ifade etmeyi deneyin.',
    bg: 'Открито е съобщение, подобно на спам, моля опитайте да го преформулирате.'
  },
  phoneRegex: {
    el: 'Μη έγκυρη μορφή αριθμού τηλεφώνου',
    en: 'Invalid phone number format',
    tr: 'Geçersiz telefon numarası formatı',
    bg: 'Невалиден формат на телефонен номер'
  }
}

const emailProviders = ['@gmail.com', '@icloud.com', '@yahoo.com']

function possiblySpamMessage(input: string) {
  const text = input.toLowerCase()

  const hasGreeting = /^(hi|hello|dear)\b/.test(text)
  const hasCTA = /(let me know|mind if i|interested in|send you|show you)/.test(
    text
  )
  const hasOffer =
    /(grow|boost|advertise|promote|video|followers|traffic)/.test(text)
  const hasLink = /http[s]?:\/\//.test(text)
  const hasSignature = /(regards|kind regards|best regards)/.test(text)

  let score = 0
  if (hasGreeting) score++
  if (hasCTA) score++
  if (hasOffer) score++
  if (hasLink) score++
  if (hasSignature) score++

  return score >= 3
}

function printIssueMessage(key: keyof typeof messages) {
  return (issue: BaseIssue<string>) => {
    const lang = issue.lang as Locale | undefined
    return lang && lang in messages[key]
      ? messages[key][lang]
      : messages[key].en
  }
}

const ContactFormSchema = object({
  fullname: pipe(
    string(),
    trim(),
    nonEmpty(),
    minLength(2, printIssueMessage('minLength')),
    maxLength(25, printIssueMessage('maxLength'))
  ),
  email: pipe(
    string(),
    trim(),
    nonEmpty(),
    email(printIssueMessage('isEmailFormat')),
    check(
      (input) => emailProviders.some((p) => input.endsWith(p)),
      printIssueMessage('checkEmail')
    )
  ),
  phone: pipe(
    string(),
    trim(),
    nonEmpty(),
    regex(
      /^(?:(\+30|0)?(2\d{9}|69\d{8})|(\+90|0)?([1-9]\d{9})|(\+359|0)?(87\d|88\d|89\d|2)\d{7}|(\+1|1)?\d{10}|(\+44|0)?\d{10,11})$/,
      printIssueMessage('phoneRegex')
    )
  ),
  message: pipe(
    string(),
    trim(),
    check(
      (input) =>
        !bannedKeywordPatterns.some((pattern) => pattern.test(input)) &&
        !possiblySpamMessage(input),
      printIssueMessage('checkSpam')
    )
  ),
  consent: literal('on')
})

type ContactFormData = InferOutput<typeof ContactFormSchema>
type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>
export type ContactFormActionState = {
  data: ContactFormData
  errors: ContactFormErrors
} & ({ok: null} | {ok: true} | {ok: false; type: 'validation' | 'api'})

export async function contactFormAction(
  locale: Locale,
  _prevState: ContactFormActionState,
  formData: FormData
): Promise<ContactFormActionState> {
  const data = {
    consent: formData.get('consent'),
    ...Object.fromEntries(formData)
  } as ContactFormData

  // Honeypot check
  const honeypot = formData.get('company_website')?.toString().trim()
  if (honeypot) {
    return {
      data,
      errors: {},
      ok: false,
      type: 'validation'
    }
  }

  const result = safeParse(ContactFormSchema, data, {lang: locale})

  if (!result.success) {
    const issues = flatten<typeof ContactFormSchema>(result.issues)

    return {
      data,
      errors: {
        fullname: issues.nested?.fullname?.[0],
        email: issues.nested?.email?.[0],
        phone: issues.nested?.phone?.[0],
        message: issues.nested?.message?.[0],
        consent: issues.nested?.consent?.[0]
      },
      ok: false,
      type: 'validation'
    }
  }

  const error = await sendContactForm(result.output, locale)

  if (error) {
    return {
      data: result.output,
      errors: {},
      ok: false,
      type: 'api'
    }
  }

  return {
    data: {} as ContactFormData,
    errors: {},
    ok: true
  }
}
