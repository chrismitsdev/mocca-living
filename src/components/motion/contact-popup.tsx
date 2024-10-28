'use client'

import * as React from 'react'
import {useTranslations} from 'next-intl'
import {motion, MotionConfig, AnimatePresence} from 'framer-motion'
import {
  MessageCircleMoreIcon,
  MessageCircleIcon,
  PhoneOutgoingIcon
} from 'lucide-react'
import {cn} from '#/lib/utils'
import {useClickOutside} from '@/hooks/useClickOutside'
import {Typography} from '@/components/ui/typography'
import {LogoViber} from '@/components/logos/logo-viber'
import {LogoWhatsApp} from '@/components/logos/logo-whatsapp'

function ContactPopup() {
  const [isOpen, setIsOpen] = React.useState(false)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const uniqueID = React.useId()
  const t = useTranslations<'Components.ContactPopup'>()
  useClickOutside(contentRef, function () {
    setIsOpen(false)
  })

  return (
    <MotionConfig
      transition={{
        delay: 0,
        duration: 0.3,
        bounce: 0.05,
        type: 'spring'
      }}
    >
      <motion.div className='fixed bottom-4 right-4 sm:hidden'>
        <AnimatePresence initial={false}>
          <motion.button
            id='popup-trigger'
            key='popup-trigger'
            layoutId={`popup-${uniqueID}`}
            className='p-2 absolute bottom-0 right-0 bg-success text-success-foreground shadow rounded'
            aria-label='Open contact menu'
            aria-haspopup='true'
            aria-controls='popup-content'
            aria-expanded={isOpen}
            onClick={() => setIsOpen(true)}
          >
            <MessageCircleMoreIcon size={24} />
          </motion.button>

          {isOpen && (
            <motion.div
              id='popup-content'
              key='popup-content'
              layoutId={`popup-${uniqueID}`}
              className='pl-2 pr-4 py-4 relative space-y-2 bg-surface-1 outline-none shadow rounded'
              role='menu'
              aria-labelledby='popup-trigger'
              ref={contentRef}
            >
              <ContactLink
                className='bg-gradient-to-l from-[#C3B3DB] to-transparent'
                // href='viber://contact?number=%2B306936998859'
                href='viber://chat/?number=%2B306936998859'
                aria-label='Viber messaging'
              >
                <span>
                  <LogoViber />
                </span>
                <Typography variant='large'>{t('viber')}</Typography>
              </ContactLink>
              <ContactLink
                className='bg-gradient-to-l from-[#C2DAA7] to-transparent'
                href='https://wa.me/+306936998859'
                aria-label='WhatsApp messaging'
              >
                <span>
                  <LogoWhatsApp />
                </span>
                <Typography variant='large'>{t('whatsapp')}</Typography>
              </ContactLink>
              <ContactLink
                className='bg-gradient-to-l from-[#B2D2FC] to-transparent'
                href='sms:+306936998859'
                aria-label='Open messaging app to send a text message'
              >
                <span className='w-8 h-8 bg-info text-info-foreground flex items-center justify-center rounded-full'>
                  <MessageCircleIcon size={17} />
                </span>
                <Typography variant='large'>{t('sms')}</Typography>
              </ContactLink>
              <ContactLink
                className='bg-gradient-to-l from-[#d1baaa] to-transparent'
                href='tel:+306936998859'
                aria-label='Open messaging app to send a text message'
              >
                <span className='w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center rounded-full'>
                  <PhoneOutgoingIcon size={17} />
                </span>
                <Typography variant='large'>{t('call')}</Typography>
              </ContactLink>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </MotionConfig>
  )
}

function ContactLink({
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn('py-1 px-2 flex items-center gap-3 rounded', className)}
      {...props}
    />
  )
}

ContactPopup.displayName = 'ContactPopup'

export {ContactPopup}
