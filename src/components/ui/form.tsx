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
import {
  FormFieldContext,
  FormItemContext,
  useFormField
} from '@/context/form-context'
import {Label} from '@/components/ui/label'
import {cn} from '#/lib/utils'

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

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{id}}>
      <div
        className={cn('space-y-0.5', className)}
        ref={ref}
        {...props}
      />
    </FormItemContext.Provider>
  )
})

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({className, ...props}, ref) => {
  const {error, formItemId} = useFormField()

  return (
    <Label
      htmlFor={formItemId}
      className={cn('align-top', error && 'text-error', className)}
      ref={ref}
      {...props}
    />
  )
})

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({...props}, ref) => {
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
      ref={ref}
      {...props}
    />
  )
})

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({className, ...props}, ref) => {
  const {formDescriptionId} = useFormField()

  return (
    <p
      id={formDescriptionId}
      className={cn('text-sm text-muted-foreground', className)}
      ref={ref}
      {...props}
    />
  )
})

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({className, children, ...props}, ref) => {
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
      ref={ref}
      {...props}
    >
      {body}
    </p>
  )
})

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
