'use client'

import * as React from 'react'
import {useTranslations} from 'next-intl'
import {motion, MotionConfig, AnimatePresence} from 'framer-motion'
import {
  MessageCircleMoreIcon,
  MessageCircleIcon,
  PhoneOutgoingIcon
} from 'lucide-react'
import {useClickOutside} from '@/hooks/useClickOutside'
import {Typography} from '@/components/ui/typography'
import {LogoViber} from '@/components/logos/logo-viber'
import {LogoWhatsApp} from '@/components/logos/logo-whatsapp'
import {cn} from '#/lib/utils'

function MessagePopup() {
  const [isOpen, setIsOpen] = React.useState(false)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const uniqueID = React.useId()
  const t = useTranslations<'Components.MessagePopup'>()
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
      <motion.div className='fixed bottom-4 right-4'>
        <AnimatePresence initial={false}>
          <motion.button
            id='popup-trigger'
            key='popup-trigger'
            layoutId={`popup-${uniqueID}`}
            className='p-2 absolute bottom-0 right-0 bg-success text-success-foreground shadow'
            style={{
              borderRadius: '4px'
            }}
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
              className='p-4 relative space-y-2 bg-surface-1 outline-none shadow'
              role='menu'
              aria-labelledby='popup-trigger'
              ref={contentRef}
            >
              <ContactLink
                className='bg-[#C3B3DB]'
                href='viber://chat?number=+306936998859'
                aria-label='Viber messaging'
              >
                <span>
                  <LogoViber />
                </span>
                <Typography variant='large'>{t('viber')}</Typography>
              </ContactLink>
              <ContactLink
                className='bg-[#C2DAA7]'
                href='whatsapp://send?phone=+306936998859'
                aria-label='WhatsApp messaging'
              >
                <span>
                  <LogoWhatsApp />
                </span>
                <Typography variant='large'>{t('whatsapp')}</Typography>
              </ContactLink>
              <ContactLink
                className='bg-[#B2D2FC]'
                href='sms:+306936998859'
                aria-label='Open messaging app to send a text message'
              >
                <span className='w-8 h-8 bg-info text-info-foreground flex items-center justify-center rounded-full'>
                  <MessageCircleIcon size={17} />
                </span>
                <Typography variant='large'>{t('sms')}</Typography>
              </ContactLink>
              <ContactLink
                className='bg-[#d1baaa]'
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

MessagePopup.displayName = 'MessagePopup'

export {MessagePopup}
