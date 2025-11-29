import {
  MessageCircleIcon,
  MessagesSquareIcon,
  PhoneOutgoingIcon,
  XIcon
} from 'lucide-react'
import {useTranslations} from 'next-intl'
import {LogoWhatsApp} from '@/src/components/logos/logo-whatsapp'
import {Button} from '@/src/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger
} from '@/src/components/ui/drawer'
import {Separator} from '@/src/components/ui/separator'
import {Typography} from '@/src/components/ui/typography'
import {cn} from '@/src/lib/utils'

const PHONE = '+306973560007'

const ContactDrawer: React.FC = () => {
  const t = useTranslations('Components.ContactDrawer')

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          className='fixed bottom-2 right-2 sm:hidden'
          variant='success'
          size='icon-normal'
        >
          <MessagesSquareIcon />
        </Button>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerOverlay />
        <DrawerContent
          className='h-full max-h-4/6'
          side='bottom'
        >
          <div className='px-7 pt-5 pb-4 space-y-2 sm:px-8 sm:py-16'>
            <DrawerTitle>{t('title')}</DrawerTitle>
            <DrawerDescription>{t('description')}</DrawerDescription>
          </div>
          <Separator />
          <div className='p-7 space-y-6 sm:p-8'>
            <ContactMethodLink
              href={`https://api.whatsapp.com/send/?phone=${PHONE.replace('+', '')}&text=${encodeURIComponent(t('message'))}&type=phone_number&app_absent=0`}
              aria-label='WhatsApp messaging'
            >
              <span>
                <LogoWhatsApp />
              </span>
              <Typography variant='large'>{t('whatsapp')}</Typography>
            </ContactMethodLink>
            <ContactMethodLink
              href={`sms:${PHONE}`}
              aria-label='Open messaging app to send a text message'
            >
              <span className='w-8 h-8 bg-info text-info-foreground flex items-center justify-center rounded-full'>
                <MessageCircleIcon size={17} />
              </span>
              <Typography variant='large'>{t('sms')}</Typography>
            </ContactMethodLink>
            <ContactMethodLink
              href={`tel:${PHONE}`}
              aria-label='Open messaging app to send a text message'
            >
              <span className='w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center rounded-full'>
                <PhoneOutgoingIcon size={17} />
              </span>
              <Typography variant='large'>{t('call')}</Typography>
            </ContactMethodLink>
          </div>
          <DrawerClose asChild>
            <Button
              className='absolute top-4 right-5'
              variant='ghost-error'
              size='icon-small'
            >
              <XIcon />
            </Button>
          </DrawerClose>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  )
}

const ContactMethodLink: React.FC<React.ComponentPropsWithRef<'a'>> = ({
  className,
  ...props
}) => {
  return (
    <a
      className={cn('flex items-center gap-3 rounded', className)}
      {...props}
    />
  )
}

ContactDrawer.displayName = 'ContactDrawer'
ContactMethodLink.displayName = 'ContactMethodLink'

export {ContactDrawer}
