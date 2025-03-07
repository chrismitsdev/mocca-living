'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import {Slot} from '@radix-ui/react-slot'
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider
} from 'react-hook-form'
import {cn} from '@/src/lib/utils'
import {
  FormFieldContext,
  FormItemContext,
  useFormField
} from '@/src/context/form-context'
import {Label} from '@/src/components/ui/label'

const Form = FormProvider

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{name: props.name}}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const FormItem: React.FC<React.ComponentPropsWithRef<'div'>> = ({
  className,
  ...props
}) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{id}}>
      <div
        className={cn('space-y-0.5', className)}
        {...props}
      />
    </FormItemContext.Provider>
  )
}

const FormLabel: React.FC<
  React.ComponentPropsWithRef<typeof LabelPrimitive.Root>
> = ({className, ...props}) => {
  const {error, formItemId} = useFormField()

  return (
    <Label
      htmlFor={formItemId}
      className={cn('align-top', error && 'text-error', className)}
      {...props}
    />
  )
}

const FormControl: React.FC<React.ComponentPropsWithRef<typeof Slot>> = ({
  ...props
}) => {
  const {error, formItemId, formDescriptionId, formMessageId} = useFormField()

  return (
    <Slot
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
}

const FormDescription: React.FC<React.ComponentPropsWithRef<'p'>> = ({
  className,
  ...props
}) => {
  const {formDescriptionId} = useFormField()

  return (
    <p
      id={formDescriptionId}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

const FormMessage: React.FC<React.ComponentPropsWithRef<'p'>> = ({
  className,
  children,
  ...props
}) => {
  const {error, formMessageId} = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p
      id={formMessageId}
      className={`text-xxs text-error text-right font-semibold ${
        className || ''
      }`}
      {...props}
    >
      {body}
    </p>
  )
}

FormItem.displayName = 'FormItem'
FormLabel.displayName = 'FormLabel'
FormControl.displayName = 'FormControl'
FormDescription.displayName = 'FormDescription'
FormMessage.displayName = 'FormMessage'

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField
}
