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
import {Button} from '@/components/ui/button'
import {LogoViber} from '@/components/logos/logo-viber'
import {LogoWhatsApp} from '@/components/logos/logo-whatsapp'

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
            className='p-2 absolute bottom-0 right-0 bg-success text-success-foreground rounded shadow'
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
              className='relative p-4 space-y-6 bg-surface-2 outline-none rounded shadow'
              role='menu'
              aria-labelledby='popup-trigger'
              ref={contentRef}
            >
              <a
                href='viber://chat?number=+306936998859'
                className='flex items-center gap-2'
                aria-label='Viber messaging'
              >
                <span>
                  <LogoViber />
                </span>
                <Typography variant='large'>{t('viber')}</Typography>
              </a>
              <a
                href='whatsapp://send?phone=+306936998859'
                className='flex items-center gap-2'
                aria-label='WhatsApp messaging'
              >
                <span>
                  <LogoWhatsApp />
                </span>
                <Typography variant='large'>{t('whatsapp')}</Typography>
              </a>
              <a
                className='flex items-center gap-2'
                href='sms:+306936998859'
                aria-label='Open messaging app to send a text message'
              >
                <Button
                  variant='info'
                  className='rounded-md'
                  size='icon-small'
                  asChild
                >
                  <span>
                    <MessageCircleIcon size={24} />
                  </span>
                </Button>
                <Typography variant='large'>{t('sms')}</Typography>
              </a>
              <a
                className='flex items-center gap-2'
                href='tel:+306936998859'
                aria-label='Open messaging app to send a text message'
              >
                <Button
                  className='rounded-md'
                  size='icon-small'
                  asChild
                >
                  <span>
                    <PhoneOutgoingIcon size={24} />
                  </span>
                </Button>
                <Typography variant='large'>{t('call')}</Typography>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </MotionConfig>
  )
}

MessagePopup.displayName = 'MessagePopup'

export {MessagePopup}
