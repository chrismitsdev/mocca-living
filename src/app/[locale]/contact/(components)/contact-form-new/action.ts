'use server'

import {
  type InferOutput,
  safeParse,
  object,
  pipe,
  string,
  nonEmpty,
  minLength,
  maxLength,
  email,
  trim,
  literal,
  picklist,
  fallback,
  date,
  flatten
} from 'valibot'

const ContactFormSchema = object({
  firstName: pipe(
    string('Πρέπει να είναι αλφαριθμιτική συμβολοσειρά'),
    trim(),
    nonEmpty('Πληκτρολογήστε το όνομά σας'),
    minLength(4, 'Πρέπει να ειναι τουλάχιστον 4 χαρακτήρες'),
    maxLength(25, 'Πρεπει να είναι εως 25 χαρακτήρες')
  ),
  lastName: pipe(
    string('Πρέπει να είναι αλφαριθμιτική συμβολοσειρά'),
    trim(),
    nonEmpty('Πληκτρολογήστε το επίθετό σας'),
    minLength(5, 'Πρέπει να ειναι τουλάχιστον 5 χαρακτήρες'),
    maxLength(25, 'Πρεπει να είναι εως 25 χαρακτήρες')
  ),
  email: pipe(
    string('Πρέπει να είναι αλφαριθμιτική συμβολοσειρά'),
    trim(),
    nonEmpty('Πληκτρολογήστε το email σας'),
    email('Μη έγκυρη μορφή email')
  ),
  phone: pipe(
    string('Πρέπει να είναι αλφαριθμιτική συμβολοσειρά'),
    trim(),
    nonEmpty('Πληκτρολογήστε το τηλέφωνο σας')
  ),
  villa: picklist(['Δήμητρα', 'Γεωργία'], 'Επιλέξτε επιθυμητή βίλα'),
  message: fallback(
    string('Πρέπει να είναι αλφαριθμιτική συμβολοσειρά'),
    'Κανένα μήνυμα'
  ),
  range: object({
    from: date('Επιλέξτε ημερομηνία άφιξης'),
    to: date('Επιλέξτε ημερομηνία αναχώρησης')
  }),
  consent: literal('on', 'Πρέπει να αποδεχτείτε τους όρους')
})

type ContactFormData = InferOutput<typeof ContactFormSchema>
type ContactFormErrors = Omit<
  Partial<Record<keyof ContactFormData, string>>,
  'message'
>
export type ContactFormActionState = {
  data: ContactFormData
  errors: ContactFormErrors
}

export async function contactFormAction(
  range: {
    from: Date | null
    to: Date | null
  },
  _prevState: ContactFormActionState,
  formData: FormData
): Promise<ContactFormActionState> {
  const rawData = Object.fromEntries(
    Array.from(formData).filter(function ([key]) {
      return !key.startsWith('$ACTION_')
    })
  )
  const data = {
    consent: formData.get('consent'),
    range,
    ...rawData
  } as ContactFormData
  const result = safeParse(ContactFormSchema, data)

  if (!result.success) {
    const issues = flatten<typeof ContactFormSchema>(result.issues)

    return {
      data,
      errors: {
        firstName: issues.nested?.firstName?.[0],
        lastName: issues.nested?.lastName?.[0],
        email: issues.nested?.email?.[0],
        phone: issues.nested?.phone?.[0],
        villa: issues.nested?.villa?.[0],
        range:
          issues.nested?.['range.from']?.[0] ||
          issues.nested?.['range.to']?.[0],
        consent: issues.nested?.consent?.[0]
      }
    }
  } else {
    return {
      data: result.output,
      errors: {}
    }
  }
}
