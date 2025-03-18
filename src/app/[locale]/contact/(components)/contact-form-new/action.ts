'use server'

import {type DateRange} from 'react-day-picker'
import {
  type InferOutput,
  object,
  pipe,
  string,
  nonEmpty,
  minLength,
  maxLength,
  email,
  trim,
  literal
} from 'valibot'

// {
//   firstName: '',
//   lastName: '',
//   email: '',
//   phone: '',
//   villa: '',
//   message: '',
//   date: { from: 2025-03-17T22:00:00.000Z, to: 2025-03-21T22:00:00.000Z }
// }

const SubmitFormSchema = object({
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
    nonEmpty('Πληκτρολογήστε τον αριθμό τηλεφώνου σας')
  ),
  villa: pipe(
    string('Πρέπει να είναι αλφαριθμιτική συμβολοσειρά'),
    trim(),
    nonEmpty('Επιλέξτε επιθυμητή βίλα')
  )
})

export async function submitFormAction(
  date: DateRange,
  prevState: any,
  formData: FormData
) {
  const rawFormData = Object.fromEntries(
    Array.from(formData).filter(function ([key]) {
      return !key.startsWith('$ACTION_')
    })
  )
  const formDataWithDate = {...rawFormData, date}

  console.log(formDataWithDate)

  return {
    message: ''
  }
}
