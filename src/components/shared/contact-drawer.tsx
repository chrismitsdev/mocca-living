import {useTranslations, useLocale} from 'next-intl'
import {
  MessagesSquareIcon,
  XIcon,
  PhoneOutgoingIcon,
  MessageCircleIcon
} from 'lucide-react'
import {cn} from '@/src/lib/utils'
import {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerClose
} from '@/src/components/ui/drawer'
import {LogoViber} from '@/src/components/logos/logo-viber'
import {LogoWhatsApp} from '@/src/components/logos/logo-whatsapp'
import {Separator} from '@/src/components/ui/separator'
import {Button} from '@/src/components/ui/button'
import {Typography} from '@/src/components/ui/typography'
import {VisuallyHidden} from '@/src/components/ui/visually-hidden'

const PHONE = '+306973560007'

const ContactDrawer: React.FC = () => {
  const locale = useLocale()
  const t = useTranslations('Components.ContactDrawer')
  const message =
    locale === 'gr'
      ? 'Γεια σας, θα ήθελα να μάθω πληροφορίες σχετικά με τη διαμονή.'
      : 'Hello, I would like to get information about the accommodation.'

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
              href={`https://api.whatsapp.com/send/?phone=${PHONE.replace('+', '')}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`}
              aria-label='WhatsApp messaging'
            >
              <span>
                <LogoWhatsApp />
              </span>
              <Typography variant='large'>{t('whatsapp')}</Typography>
            </ContactMethodLink>
            <ContactMethodLink
              href={`viber://chat/?number=${encodeURIComponent(PHONE)}`}
              aria-label='Viber messaging'
            >
              <span>
                <LogoViber />
              </span>
              <Typography variant='large'>{t('viber')}</Typography>
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
              <VisuallyHidden>Close drawer</VisuallyHidden>
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
