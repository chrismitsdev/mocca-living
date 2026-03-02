'use server'

import type {Locale} from 'next-intl'
import {
  check,
  email,
  flatten,
  type InferOutput,
  literal,
  maxLength,
  minLength,
  nonEmpty,
  notValues,
  object,
  pipe,
  regex,
  safeParse,
  setSpecificMessage,
  string,
  trim
} from 'valibot'
import {sendContactForm} from '@/src/lib/send-contact-form'

setSpecificMessage(string, 'Πρέπει να είναι γράμματα & αριθμοί', 'el')
setSpecificMessage(nonEmpty, 'Υποχρεωτικό πεδίο', 'el')
setSpecificMessage(minLength, 'Tουλάχιστον 5 χαρακτήρες', 'el')
setSpecificMessage(maxLength, 'Μέγιστο 25 χαρακτήρες', 'el')
setSpecificMessage(email, 'Μη έγκυρη μορφή email', 'el')
setSpecificMessage(notValues, 'Η διεύθυνση email δεν επιτρέπεται', 'el')
setSpecificMessage(check, 'Αποδεκτά email: gmail, icloud, yahoo', 'el')
setSpecificMessage(regex, 'Μη έγκυρη μορφή αριθμού τηλεφώνου', 'el')

setSpecificMessage(string, 'Must contain only letters & numbers', 'en')
setSpecificMessage(nonEmpty, 'Mandatory field', 'en')
setSpecificMessage(minLength, 'At least 5 characters', 'en')
setSpecificMessage(maxLength, 'Maximum 25 characters', 'en')
setSpecificMessage(email, 'Invalid email format', 'en')
setSpecificMessage(notValues, 'Email address is not allowed', 'en')
setSpecificMessage(check, 'Accepted email: gmail, icloud, yahoo', 'en')
setSpecificMessage(regex, 'Invalid phone number format', 'en')

setSpecificMessage(string, 'Yalnızca harf ve rakam içermelidir', 'tr')
setSpecificMessage(nonEmpty, 'Zorunlu alan', 'tr')
setSpecificMessage(minLength, 'En az 5 karakter', 'tr')
setSpecificMessage(maxLength, 'Maksimum 25 karakter', 'tr')
setSpecificMessage(email, 'Geçersiz e-posta formatı', 'tr')
setSpecificMessage(notValues, 'E-posta adresine izin verilmiyor', 'tr')
setSpecificMessage(check, 'Kabul edilen e-posta: gmail, icloud, yahoo', 'tr')
setSpecificMessage(regex, 'Geçersiz telefon numarası formatı', 'tr')

setSpecificMessage(string, 'Трябва да съдържа само букви и цифри', 'bg')
setSpecificMessage(nonEmpty, 'Задължително поле', 'bg')
setSpecificMessage(minLength, 'Поне 5 символа', 'bg')
setSpecificMessage(maxLength, 'Максимум 25 символа', 'bg')
setSpecificMessage(email, 'Невалиден формат на имейл', 'bg')
setSpecificMessage(notValues, 'Имейл адресът не е разрешен', 'bg')
setSpecificMessage(check, 'Приети имейли: gmail, icloud, yahoo', 'bg')
setSpecificMessage(regex, 'Невалиден формат на телефонен номер', 'bg')

const ContactFormSchema = object({
  firstName: pipe(string(), trim(), nonEmpty(), minLength(5), maxLength(25)),
  lastName: pipe(string(), trim(), nonEmpty(), minLength(5), maxLength(25)),
  email: pipe(
    string(),
    trim(),
    nonEmpty(),
    email(),
    // Banned emails
    notValues(['pageranktechnology@gmail.com']),
    // Allowed email service providers
    check((input) =>
      ['@gmail.com', '@icloud.com', '@yahoo.com'].some((provider) =>
        input.endsWith(provider)
      )
    )
  ),
  phone: pipe(string(), trim(), nonEmpty(), regex(/^\d{10,}$/)),
  message: string(),
  consent: literal('on')
})

type ContactFormData = InferOutput<typeof ContactFormSchema>
type ContactFormErrors = Omit<
  Partial<Record<keyof ContactFormData, string>>,
  'message'
>
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
  const result = safeParse(ContactFormSchema, data, {lang: locale})

  if (!result.success) {
    const issues = flatten<typeof ContactFormSchema>(result.issues)

    return {
      data,
      errors: {
        firstName: issues.nested?.firstName?.[0],
        lastName: issues.nested?.lastName?.[0],
        email: issues.nested?.email?.[0],
        phone: issues.nested?.phone?.[0],
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
