'use server'

import {type Locale} from 'next-intl'
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
  literal,
  flatten,
  regex,
  safeParse,
  setSpecificMessage
} from 'valibot'
import {sendContactForm} from '@/src/lib/utils'

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
setSpecificMessage(regex, 'Μη έγκυρη μορφή αριθμού τηλεφώνου', 'gr')
setSpecificMessage(regex, 'Invalid phone number format', 'en')

const ContactFormSchema = object({
  firstName: pipe(string(), trim(), nonEmpty(), minLength(5), maxLength(25)),
  lastName: pipe(string(), trim(), nonEmpty(), minLength(5), maxLength(25)),
  email: pipe(string(), trim(), nonEmpty(), email()),
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
  const valibot = safeParse(ContactFormSchema, data, {lang: locale})

  if (!valibot.success) {
    const issues = flatten<typeof ContactFormSchema>(valibot.issues)

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

  const error = await sendContactForm(valibot.output)

  if (error) {
    return {
      data: valibot.output,
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
