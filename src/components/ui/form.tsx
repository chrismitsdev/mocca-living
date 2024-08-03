'use client'

import * as React from 'react'
import {Slot} from '@radix-ui/react-slot'
import {
  type FieldValues,
  type FieldPath,
  type ControllerProps,
  FormProvider,
  Controller,
} from 'react-hook-form'
import {Label} from '@/components/ui/label'
import {cn} from '#/lib/utils'
import {FormFieldContext, FormItemContext, useFormField} from '@/context/form-context'

const Form = FormProvider

const FormFieldControllerProvider = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({...props}: ControllerProps<TFieldValues, TName>) => {
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
        className={cn('space-y-2', className)} 
        ref={ref} 
        {...props} 
      />
    </FormItemContext.Provider>
  )
})

const FormLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({className, ...props}, ref) => {
  const {error, formItemId} = useFormField()

  return (
    <Label
      className={cn(error && "text-error", className)}
      htmlFor={formItemId}
      ref={ref}
      {...props}
    />
  )
})

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
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
      ref={ref}
      id={formMessageId}
      className={cn('text-sm font-medium text-error', className)}
      {...props}
    >
      {body}
    </p>
  )
})

FormLabel.displayName = 'FormLabel'
FormItem.displayName = 'FormItem'
FormControl.displayName = 'FormControl'
FormDescription.displayName = 'FormDescription'
FormMessage.displayName = 'FormMessage'

export {
  useFormField,
  Form,
  FormFieldControllerProvider,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
}
