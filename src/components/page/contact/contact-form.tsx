import {
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle
} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Label} from '@/components/ui/label'
import {Input} from '@/components/ui/input'
import {DateRangePicker} from '@/components/ui/date-range-picker'
import {PaperPlaneIcon} from '@radix-ui/react-icons'

function ContactForm({locale}: {locale: Params['params']['locale']}) {
  return (
    <article className='py-12'>
      <Card className='mx-auto max-w-5xl'>
        <CardHeader>
          <CardTitle>{'Contact us'}</CardTitle>
          <CardDescription>
            {'Fill out the form below to contact us for information or questions regarding Mocca Living'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className='space-y-4'>
            <div className='space-y-1'>
              <Label htmlFor='first-name'>{'First name'}</Label>
              <Input id='first-name' />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='last-name'>{'Last name'}</Label>
              <Input id='last-name' />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='email'>{'Email'}</Label>
              <Input id='email' type='email' />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='phone'>{'Phone number'}</Label>
              <Input id='phone' />
            </div>
            <div className='space-y-1'>
              <Label>{'Select date range'}</Label>
              <DateRangePicker locale={locale} />
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