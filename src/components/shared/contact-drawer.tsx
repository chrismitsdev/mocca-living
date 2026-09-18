'use client'

import {
  IconBrandWhatsapp,
  IconBubbleTextFilled,
  IconDeviceMobileMessage,
  IconPhoneCall
} from '@tabler/icons-react'
import {useTranslations} from 'next-intl'
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/src/components/ui/drawer'
import {IconButton} from '@/src/components/ui/icon-button'
import {Typography} from '@/src/components/ui/typography'
import {PHONE} from '@/src/lib/utils'

function ContactDrawer() {
  const t = useTranslations('Components.contact_drawer')

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <IconButton
          aria-label='Open contact options'
          className='fixed inset-be-16 inset-e-3 bg-success text-success-foreground border-success hover:bg-success-hover hover:border-success-hover sm:hidden'
          variant='outline'
        >
          <IconBubbleTextFilled />
        </IconButton>
      </DrawerTrigger>
      <DrawerContent
        className='h-full max-block-1/2'
        side='bottom'
      >
        <DrawerHeader>
          <DrawerTitle>{t('title')}</DrawerTitle>
          <DrawerClose />
          <DrawerDescription>{t('description')}</DrawerDescription>
        </DrawerHeader>
        <DrawerBody className='space-y-4'>
          <ContactMethodLink
            aria-label='WhatsApp messaging'
            href={`https://api.whatsapp.com/send/?phone=${PHONE.replace('+', '')}&text=${encodeURIComponent(t('message'))}&type=phone_number&app_absent=0`}
          >
            <IconBrandWhatsapp />
            <Typography variant='large'>{t('whatsapp')}</Typography>
          </ContactMethodLink>
          <ContactMethodLink
            aria-label='SMS message'
            href={`sms:${PHONE}`}
          >
            <IconDeviceMobileMessage />
            <Typography variant='large'>{t('sms')}</Typography>
          </ContactMethodLink>
          <ContactMethodLink
            aria-label='Call us'
            href={`tel:${PHONE}`}
          >
            <IconPhoneCall />
            <Typography variant='large'>{t('call')}</Typography>
          </ContactMethodLink>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

function ContactMethodLink(props: React.ComponentPropsWithRef<'a'>) {
  return (
    <a
      className='py-4 flex items-center gap-3'
      {...props}
    />
  )
}

export {ContactDrawer}

// 'use client'

// import {
//   IconBrandWhatsapp,
//   IconBubbleTextFilled,
//   IconDeviceMobileMessage,
//   IconPhoneCall
// } from '@tabler/icons-react'
// import {useTranslations} from 'next-intl'
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerTitle,
//   DrawerTrigger
// } from '@/src/components/ui/drawer'
// import {IconButton} from '@/src/components/ui/icon-button'
// import {Separator} from '@/src/components/ui/separator'
// import {Typography} from '@/src/components/ui/typography'
// import {PHONE} from '@/src/lib/utils'

// function ContactDrawer() {
//   const t = useTranslations('Components.contact_drawer')

//   return (
//     <Drawer>
//       <DrawerTrigger asChild>
//         <IconButton
//           aria-label='Open contact options'
//           className='fixed inset-be-16 inset-e-3 bg-success text-success-foreground border-success hover:bg-success-hover hover:border-success-hover sm:hidden'
//           variant='outline'
//         >
//           <IconBubbleTextFilled />
//         </IconButton>
//       </DrawerTrigger>
//       <DrawerContent
//         className='h-full max-h-3/4'
//         side='bottom'
//       >
//         <DrawerClose className='absolute top-5 right-4' />
//         <div className='p-6 space-y-4'>
//           <DrawerTitle>{t('title')}</DrawerTitle>
//           <DrawerDescription>{t('description')}</DrawerDescription>
//         </div>
//         <Separator />
//         <div className='p-6 space-y-4'>
//           <ContactMethodLink
//             aria-label='WhatsApp messaging'
//             href={`https://api.whatsapp.com/send/?phone=${PHONE.replace('+', '')}&text=${encodeURIComponent(t('message'))}&type=phone_number&app_absent=0`}
//           >
//             <IconBrandWhatsapp />
//             <Typography variant='large'>{t('whatsapp')}</Typography>
//           </ContactMethodLink>
//           <ContactMethodLink
//             aria-label='SMS message'
//             href={`sms:${PHONE}`}
//           >
//             <IconDeviceMobileMessage />
//             <Typography variant='large'>{t('sms')}</Typography>
//           </ContactMethodLink>
//           <ContactMethodLink
//             aria-label='Call us'
//             href={`tel:${PHONE}`}
//           >
//             <IconPhoneCall />
//             <Typography variant='large'>{t('call')}</Typography>
//           </ContactMethodLink>
//         </div>
//       </DrawerContent>
//     </Drawer>
//   )
// }

// function ContactMethodLink(props: React.ComponentPropsWithRef<'a'>) {
//   return (
//     <a
//       className='py-4 flex items-center gap-3'
//       {...props}
//     />
//   )
// }

// export {ContactDrawer}
