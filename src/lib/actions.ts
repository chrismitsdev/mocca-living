'use server'

import {
  type InferOutput,
  object,
  pipe,
  string,
  trim,
  nonEmpty,
  minLength,
  maxLength,
  email,
  check,
  literal,
  flatten,
  regex,
  safeParse,
  setSpecificMessage
} from 'valibot'
import {type Locale} from 'next-intl'
import {sendContactForm} from '@/src/lib/send-contact-form'

setSpecificMessage(string, 'Πρέπει να είναι γράμματα & αριθμοί', 'gr')
setSpecificMessage(string, 'Must contain only letters & numbers', 'en')
setSpecificMessage(nonEmpty, 'Υποχρεωτικό πεδίο', 'gr')
setSpecificMessage(nonEmpty, 'Mandatory field', 'en')
setSpecificMessage(minLength, 'Tουλάχιστον 5 χαρακτήρες', 'gr')
setSpecificMessage(minLength, 'At least 5 characters', 'en')
setSpecificMessage(maxLength, 'Μέγιστο 25 χαρακτήρες', 'gr')
setSpecificMessage(maxLength, 'Maximum 25 characters', 'en')
setSpecificMessage(email, 'Μη έγκυρη μορφή email', 'gr')
setSpecificMessage(email, 'Invalid email format', 'en')
setSpecificMessage(check, 'Αποδεκτοί πάροχοι email: gmail, icloud, yahoo', 'gr')
setSpecificMessage(
  check,
  'Accepted email providers: gmail, icloud, yahoo',
  'en'
)
setSpecificMessage(regex, 'Μη έγκυρη μορφή αριθμού τηλεφώνου', 'gr')
setSpecificMessage(regex, 'Invalid phone number format', 'en')

const ContactFormSchema = object({
  firstName: pipe(string(), trim(), nonEmpty(), minLength(5), maxLength(25)),
  lastName: pipe(string(), trim(), nonEmpty(), minLength(5), maxLength(25)),
  email: pipe(
    string(),
    trim(),
    nonEmpty(),
    email(),
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
