import {useTranslations} from 'next-intl'
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

const ContactDrawer: React.FC = () => {
  const t = useTranslations()

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          className='fixed bottom-4 right-4 sm:hidden'
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
            <DrawerTitle>{t('Components.ContactDrawer.title')}</DrawerTitle>
            <DrawerDescription>
              {t('Components.ContactDrawer.description')}
            </DrawerDescription>
          </div>
          <Separator />
          <div className='p-7 space-y-6 sm:p-8'>
            <ContactLink
              href='viber://chat/?number=%2B306936998859'
              aria-label='Viber messaging'
            >
              <span>
                <LogoViber />
              </span>
              <Typography variant='large'>
                {t('Components.ContactDrawer.viber')}
              </Typography>
            </ContactLink>
            <ContactLink
              href='https://wa.me/+306936998859'
              aria-label='WhatsApp messaging'
            >
              <span>
                <LogoWhatsApp />
              </span>
              <Typography variant='large'>
                {t('Components.ContactDrawer.whatsapp')}
              </Typography>
            </ContactLink>
            <ContactLink
              href='sms:+306936998859'
              aria-label='Open messaging app to send a text message'
            >
              <span className='w-8 h-8 bg-info text-info-foreground flex items-center justify-center rounded-full'>
                <MessageCircleIcon size={17} />
              </span>
              <Typography variant='large'>
                {t('Components.ContactDrawer.sms')}
              </Typography>
            </ContactLink>
            <ContactLink
              href='tel:+306936998859'
              aria-label='Open messaging app to send a text message'
            >
              <span className='w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center rounded-full'>
                <PhoneOutgoingIcon size={17} />
              </span>
              <Typography variant='large'>
                {t('Components.ContactDrawer.call')}
              </Typography>
            </ContactLink>
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

const ContactLink: React.FC<React.ComponentPropsWithRef<'a'>> = ({
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
ContactLink.displayName = 'ContactLink'

export {ContactDrawer}
