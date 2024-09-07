import {useTranslations} from 'next-intl'
import {z, ZodType} from 'zod'

type SlugFormData = Omit<ContactFormData, 'villa' | 'message'>

const emailProviders = [
  '@gmail.com',
  '@yahoo.com',
  '@outlook.com',
  '@hotmail.com',
  '@icloud.com'
]

const greekPhoneRegex = /^(\+30\s?)?(2\d|69)\d{8}$/g

export function getContactFormSchema(
  t: ReturnType<typeof useTranslations<'Pages.Contact.Form'>>
) {
  const schema: ZodType<ContactFormData> = z.object({
    fullName: z
      .string()
      .trim()
      .min(1, {message: t('validation.required')})
      .min(5, {message: t('validation.fullName')})
      .max(25, {message: t('validation.fullName')}),
    email: z
      .string()
      .trim()
      .min(1, {message: t('validation.required')})
      .email({message: t('validation.email.invalid')})
      .refine((value) => emailProviders.some((p) => value.endsWith(p)), {
        message: t('validation.email.providers')
      }),
    phone: z
      .string()
      .trim()
      .min(1, {message: t('validation.required')})
      .regex(greekPhoneRegex, {message: t('validation.phone')}),
    checkIn: z.date({required_error: t('validation.required')}),
    checkOut: z.date({required_error: t('validation.required')}),
    villa: z
      .string()
      .trim()
      .min(1, {message: t('validation.required')}),
    message: z.string(),
    consentData: z.literal(true)
  })

  return schema
}

export function getSlugFormSchema(
  t: ReturnType<typeof useTranslations<'Pages.Contact.Form'>>
) {
  const schema: ZodType<SlugFormData> = z.object({
    fullName: z
      .string()
      .trim()
      .min(1, {message: t('validation.required')})
      .min(5, {message: t('validation.fullName')})
      .max(25, {message: t('validation.fullName')}),
    email: z
      .string()
      .trim()
      .min(1, {message: t('validation.required')})
      .email({message: t('validation.email.invalid')})
      .refine((value) => emailProviders.some((p) => value.endsWith(p)), {
        message: t('validation.email.providers')
      }),
    phone: z
      .string()
      .trim()
      .min(1, {message: t('validation.required')})
      .regex(greekPhoneRegex, {message: t('validation.phone')}),
    checkIn: z.date({required_error: t('validation.required')}),
    checkOut: z.date({required_error: t('validation.required')}),
    consentData: z.literal(true)
  })

  return schema
}

export type ContactFormSchema = z.infer<ReturnType<typeof getContactFormSchema>>
export type SlugFormSchema = z.infer<ReturnType<typeof getSlugFormSchema>>
