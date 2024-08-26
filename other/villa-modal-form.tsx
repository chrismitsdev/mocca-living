'use client'

import {useTranslations} from 'next-intl'
import {XIcon} from 'lucide-react'
import {
  Dialog,
  DialogTrigger,
  DialogOverlay,
  DialogPortal,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog'
import {Form} from '#/other/form'
import {
  ScrollArea,
  ScrollAreaViewport,
  ScrollAreaBar
} from '@/components/ui/scrollarea'
import {Button} from '@/components/ui/button'
import {Separator} from '@/components/ui/separator'

type VillaModalFormProps = {
  locale: Params['params']['locale']
  children: React.ReactNode
  tForm: ReturnType<typeof useTranslations<'Pages.Contact.Form'>>
}

function VillaModalForm({locale, tForm, children}: VillaModalFormProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent className='p-0 w-[calc(100%-32px)] max-w-3xl'>
          <DialogHeader className='px-4 pt-8 pb-6'>
            <DialogTitle>{'Enquiry contact form'}</DialogTitle>
            <DialogDescription>
              {'Fill out this form to enquire'}
            </DialogDescription>
          </DialogHeader>
          <Separator />
          <ScrollArea type='always'>
            <ScrollAreaViewport className='max-h-[calc(100svh-110px-32px)]'>
              <Form
                wrapperClassName='px-4 py-8 space-y-2'
                buttonWrapperClassName='pt-8 flex justify-end gap-4'
                locale={locale}
                fieldTranslations={{
                  fullName: {
                    label: tForm('fields.fullName.label'),
                    placeholder: tForm('fields.fullName.placeholder'),
                    validation: {
                      required: tForm('fields.fullName.validation.required'),
                      length: tForm('fields.fullName.validation.length')
                    }
                  },
                  email: {
                    label: tForm('fields.email.label'),
                    placeholder: tForm('fields.email.placeholder'),
                    validation: {
                      required: tForm('fields.email.validation.required'),
                      pattern: tForm('fields.email.validation.pattern'),
                      whitelistedProviders: tForm(
                        'fields.email.validation.whitelistedProviders'
                      )
                    }
                  },
                  phone: {
                    label: tForm('fields.phone.label'),
                    placeholder: tForm('fields.phone.placeholder'),
                    validation: {
                      required: tForm('fields.phone.validation.required'),
                      pattern: tForm('fields.phone.validation.pattern')
                    }
                  },
                  checkIn: {
                    label: tForm('fields.checkIn.label'),
                    placeholder: tForm('fields.checkIn.placeholder'),
                    validation: {
                      required: tForm('fields.checkIn.validation.required')
                    }
                  },
                  checkOut: {
                    label: tForm('fields.checkOut.label'),
                    placeholder: tForm('fields.checkOut.placeholder'),
                    validation: {
                      required: tForm('fields.checkOut.validation.required')
                    }
                  },
                  villa: {
                    label: tForm('fields.villa.label'),
                    placeholder: tForm('fields.villa.placeholder'),
                    validation: {
                      required: tForm('fields.villa.validation.required')
                    }
                  },
                  message: {
                    label: tForm('fields.message.label'),
                    placeholder: tForm('fields.message.placeholder')
                  },
                  consentData: {
                    label: tForm('fields.consentData.label'),
                    validation: {
                      required: tForm('fields.consentData.validation.required')
                    }
                  }
                }}
                submitBtnLabel={tForm('submit-btn')}
                resetBtnLabel={tForm('reset-btn')}
              />
            </ScrollAreaViewport>
            <ScrollAreaBar />
          </ScrollArea>
          <DialogClose asChild>
            <Button
              className='absolute top-4 right-4'
              variant='ghost-error'
              size='icon-mini'
            >
              <XIcon />
            </Button>
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

VillaModalForm.displayName = 'VillaModalForm'

export {VillaModalForm}
