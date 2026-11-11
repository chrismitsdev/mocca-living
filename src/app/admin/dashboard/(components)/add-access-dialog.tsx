'use client'

import {IconHash, IconPlus, IconUser, IconUsers} from '@tabler/icons-react'
import {useActionState, useId, useState} from 'react'
import {FormControl} from '@/src/components/shared/form-control'
import {Button} from '@/src/components/ui/button'
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/src/components/ui/dialog'
import {Input} from '@/src/components/ui/input'
import {Label} from '@/src/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectPortal,
  SelectTrigger,
  SelectValue,
  SelectViewport
} from '@/src/components/ui/select'
import {Typography} from '@/src/components/ui/typography'
import {useResultToast} from '@/src/hooks/use-result-toast'
import {
  type AdminFormState,
  addAccessAction
} from '@/src/lib/guest-app/admin/actions'
import {PROPERTY_LABELS} from './labels'
import {StayDatesField} from './stay-dates-field'

type AddAccessData = {
  reservationNumber: string
  property: string
  bookerName: string
  checkIn: string
  checkOut: string
  guestCount: string
}

const emptyData: AddAccessData = {
  bookerName: '',
  reservationNumber: '',
  property: '',
  checkIn: '',
  checkOut: '',
  guestCount: ''
}

const initialState: AdminFormState<AddAccessData> = {
  data: emptyData,
  errors: {},
  ok: null
}

/** Give guest-app access for a booking that didn't arrive by email */
function AddAccessDialog() {
  const descriptionId = useId()
  const [open, setOpen] = useState(false)
  const [state, action, isPending] = useActionState(
    addAccessAction,
    initialState
  )
  useResultToast(state, () => handleOpenChange(false))

  // React resets a form after every submission. Remounting the fields on
  // each new result makes them all (including the select and the date
  // picker) start again from the values the server sent back
  const [shownState, setShownState] = useState(state)
  const [fieldsKey, setFieldsKey] = useState(0)
  // Closing the dialog clears it: it reopens empty, without old errors
  const [cleared, setCleared] = useState(false)
  if (state !== shownState) {
    setShownState(state)
    setFieldsKey((key) => key + 1)
    setCleared(false)
  }

  const {data, errors} = cleared ? initialState : state

  function handleOpenChange(next: boolean) {
    if (isPending) return
    setOpen(next)
    if (!next) {
      setCleared(true)
      setFieldsKey((key) => key + 1)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
    >
      <DialogTrigger asChild>
        <Button>
          Προσθήκη πρόσβασης
          <IconPlus aria-hidden />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={descriptionId}>
        <DialogHeader>
          <DialogTitle>Προσθήκη πρόσβασης</DialogTitle>
          <DialogClose
            aria-label='Κλείσιμο'
            disabled={isPending}
          />
        </DialogHeader>
        <DialogBody>
          <Typography
            id={descriptionId}
            className='mb-6'
          >
            Για κράτηση που δεν καταχωρήθηκε αυτόματα, π.χ. τηλεφωνική ή χωρίς
            email.
          </Typography>
          <form
            key={fieldsKey}
            action={action}
            noValidate
          >
            <div className='space-y-4'>
              <FormControl
                id='bookerName'
                error={errors.bookerName}
              >
                <Label htmlFor='bookerName'>Ονοματεπώνυμο</Label>
                <Input
                  id='bookerName'
                  name='bookerName'
                  autoComplete='off'
                  placeholder='Όπως θα το πληκτρολογήσει ο επισκέπτης'
                  defaultValue={data.bookerName}
                  icon={IconUser}
                  error={Boolean(errors.bookerName)}
                  disabled={isPending}
                />
              </FormControl>
              <FormControl
                id='reservationNumber'
                error={errors.reservationNumber}
              >
                <Label htmlFor='reservationNumber'>Αριθμός κράτησης</Label>
                <Input
                  id='reservationNumber'
                  name='reservationNumber'
                  autoComplete='off'
                  placeholder='π.χ. 1234567890'
                  defaultValue={data.reservationNumber}
                  icon={IconHash}
                  error={Boolean(errors.reservationNumber)}
                  disabled={isPending}
                />
              </FormControl>
              <PropertySelect
                defaultValue={data.property}
                error={errors.property}
                disabled={isPending}
              />
              <div className='grid gap-4 sm:grid-cols-4'>
                <StayDatesField
                  defaultCheckIn={data.checkIn}
                  defaultCheckOut={data.checkOut}
                  errors={{checkIn: errors.checkIn, checkOut: errors.checkOut}}
                  disabled={isPending}
                />
                <FormControl
                  id='guestCount'
                  error={errors.guestCount}
                >
                  <Label htmlFor='guestCount'>Άτομα</Label>
                  <Input
                    id='guestCount'
                    name='guestCount'
                    type='number'
                    inputMode='numeric'
                    min={1}
                    step={1}
                    placeholder='π.χ. 1'
                    defaultValue={data.guestCount}
                    icon={IconUsers}
                    error={Boolean(errors.guestCount)}
                    disabled={isPending}
                  />
                </FormControl>
              </div>
              <div className='pt-10 flex flex-wrap justify-end gap-2'>
                <Button
                  type='button'
                  variant='secondary'
                  onClick={() => handleOpenChange(false)}
                  disabled={isPending}
                >
                  Άκυρο
                </Button>
                <Button
                  type='submit'
                  isLoading={isPending}
                >
                  Προσθήκη
                  <IconPlus aria-hidden />
                </Button>
              </div>
            </div>
          </form>
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}

function PropertySelect({
  defaultValue,
  error,
  disabled
}: {
  defaultValue: string
  error?: string
  disabled?: boolean
}) {
  return (
    <FormControl
      id='property'
      error={error}
    >
      <Label htmlFor='property'>Κατάλυμα</Label>
      {/* With a name, Radix renders a hidden select that the form submits */}
      <Select
        name='property'
        defaultValue={defaultValue || undefined}
        disabled={disabled}
      >
        <SelectTrigger
          id='property'
          className='py-3.75 px-4 bg-surface-3 border-transparent hover:bg-surface-3 focus-visible:bg-surface-3 not-data-placeholder:border-surface-4 data-open:border-surface-4 aria-invalid:border-danger data-placeholder:[&>span]:text-sm data-placeholder:[&>span]:leading-6 data-placeholder:[&>span]:text-[color-mix(in_oklab,currentcolor_50%,transparent)]'
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? 'property-error' : undefined}
        >
          <SelectValue placeholder='Επιλέξτε κατάλυμα' />
        </SelectTrigger>
        <SelectPortal>
          <SelectContent>
            <SelectViewport>
              {Object.entries(PROPERTY_LABELS).map(([slug, label]) => (
                <SelectItem
                  key={slug}
                  value={slug}
                >
                  <SelectItemText>{label}</SelectItemText>
                </SelectItem>
              ))}
            </SelectViewport>
          </SelectContent>
        </SelectPortal>
      </Select>
    </FormControl>
  )
}

export {AddAccessDialog}
