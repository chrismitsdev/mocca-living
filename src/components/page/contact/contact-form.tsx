'use client'

import * as React from 'react'
import {addDays, subDays} from 'date-fns'
import {
  PaperPlaneIcon, 
  AvatarIcon, 
  EnvelopeClosedIcon, 
  MobileIcon, 
  EnterIcon, 
  ExitIcon, 
  HomeIcon,
  ChatBubbleIcon
} from '@radix-ui/react-icons'
import {
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle
} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {FormControl} from '@/components/ui/form-control'
import {Label} from '@/components/ui/label'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {DatePicker} from '@/components/ui/date-picker'
import {
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectPortal, 
  SelectContent, 
  SelectViewport,
  SelectItem
} from '@/components/ui/select'

function ContactForm({locale}: {locale: Params['params']['locale']}) {
  const [checkInDate, setCheckInDate] = React.useState<Date>()
  const [checkOutDate, setCheckOutDate] = React.useState<Date>()

  return (
    <article className='py-12'>
      <Card className='px-4 py-8 sm:px-12 sm:py-16'>
        <CardHeader>
          <CardTitle>{'Contact us'}</CardTitle>
          <CardDescription>
            {'Fill out the form below to make a booking or reservation, and we will contact you shortly.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className='grid gap-y-2 gap-x-8 sm:grid-cols-3'>
              <FormControl>
                <Label htmlFor='full-name'>{'Full Name'}</Label>
                <Input id='full-name' placeholder='Enter you first name' icon={AvatarIcon} />
              </FormControl>  

              <FormControl>
                <Label htmlFor='email'>{'Email'}</Label>
                <Input id='email' type='email' placeholder='Enter your email' icon={EnvelopeClosedIcon} />
              </FormControl>

              <FormControl>
                <Label htmlFor='phone'>{'Phone number'}</Label>
                <Input id='phone' placeholder='Enter your phone number' icon={MobileIcon} />
              </FormControl>

              <FormControl>
                <Label>{'Check in date'}</Label>
                <DatePicker 
                  date={checkInDate} 
                  onDateChange={setCheckInDate} 
                  locale={locale} 
                  placeholder='Pick a check-in date'
                  disabled={{
                    before: new Date(),
                    after: !checkOutDate ? undefined : subDays(checkOutDate, 1)
                  }}
                  icon={EnterIcon}
                />
              </FormControl>

              <FormControl>
                <Label>{'Check out date'}</Label>
                <DatePicker 
                  date={checkOutDate} 
                  onDateChange={setCheckOutDate} 
                  locale={locale} 
                  placeholder='Pick a check-out date'
                  disabled={{
                    before: !checkInDate ? new Date() : addDays(checkInDate, 1)
                  }}
                  icon={ExitIcon}
                />
              </FormControl>
              <FormControl>
                <Label>{'Choose your house'}</Label>
                <Select>
                  <SelectTrigger className='w-full'>
                    <span className='flex items-center gap-2'>
                      <HomeIcon width={16} height={16} />
                      <SelectValue placeholder='Pick a house' />
                    </span>
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectContent>
                      <SelectViewport>
                        <SelectItem value='georgia'>{"Georgia"}</SelectItem>
                        <SelectItem value='dimitra'>{"Dimitra"}</SelectItem>
                      </SelectViewport>
                    </SelectContent>
                  </SelectPortal>
                </Select>
              </FormControl>
              <FormControl className='min-h-fit sm:col-span-3'>
                <Label htmlFor='message'>{'Your message'}</Label>
                <Textarea id='message' placeholder='Optionally your message here...' icon={ChatBubbleIcon} />
              </FormControl>
            </div>
          </form>
        </CardContent>
        <CardFooter className=' sm:justify-end'>
          <Button className='w-full sm:w-auto'>
            <span>{'Submit'}</span>
            <PaperPlaneIcon width={16} height={16} />
          </Button>
        </CardFooter>
      </Card>
    </article>
  )
}

ContactForm.displayName = 'ContactForm'

export {ContactForm}