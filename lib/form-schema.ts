import {z, ZodType} from 'zod'

const emailProviders = [
  '@gmail.com',
  '@yahoo.com',
  '@outlook.com',
  '@hotmail.com',
  '@icloud.com'
]

const greekMobileRegex = /^(2\d|69)\d{8}$/g

export const formSchema: ZodType<ContactFormData> = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, {message: 'Mandatory field'})
    .min(5, {message: 'Must be between 5 and 25 characters long'})
    .max(25, {message: 'Must be between 5 and 25 characters long'}),
  email: z
    .string()
    .trim()
    .min(1, {message: 'Mandatory field'})
    .email({message: 'Invalid email address'})
    .refine((value) => emailProviders.some((p) => value.endsWith(p)), {
      message: 'Email provider is not supported'
    }),
  phone: z
    .string()
    .trim()
    .min(1, {message: 'Mandatory field'})
    .regex(greekMobileRegex, {message: 'Invalid phone number format'}),
  checkIn: z.date({required_error: 'Mandatory field'}),
  checkOut: z.date({required_error: 'Mandatory field'}),
  villa: z.string().trim().min(1, {message: 'Mandatory field'}),
  message: z.string(),
  consentData: z.literal(true)
})

export type FormSchema = z.infer<typeof formSchema>
