'use client'

import * as React from 'react'
import {motion, MotionConfig, AnimatePresence} from 'framer-motion'
import {MessageCircleMoreIcon, MessageCircleIcon} from 'lucide-react'
import {useOnClickOutside} from '@/hooks/useOnClickOutside'
import {Typography} from '@/components/ui/typography'
import {Button} from '@/components/ui/button'
import {LogoViber} from '@/components/logos/logo-viber'
import {LogoWhatsApp} from '@/components/logos/logo-whatsapp'

function MessagePopup() {
  const [isOpen, setIsOpen] = React.useState(false)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const uniqueID = React.useId()
  useOnClickOutside(contentRef, () => setIsOpen(false))

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
        <AnimatePresence>
          <motion.button
            key='popup-trigger'
            layoutId={`popup-${uniqueID}`}
            className='p-2 absolute bottom-0 right-0 bg-success text-success-foreground rounded shadow'
            onClick={() => setIsOpen(true)}
          >
            <MessageCircleMoreIcon size={24} />
          </motion.button>

          {isOpen && (
            <motion.div
              key='popup-content'
              layoutId={`popup-${uniqueID}`}
              className='relative p-4 space-y-6 bg-surface-2 outline-none rounded shadow'
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
                <Typography variant='large'>Viber</Typography>
              </a>
              <a
                href='whatsapp://send?phone=+306936998859'
                className='flex items-center gap-2'
                aria-label='WhatsApp messaging'
              >
                <span>
                  <LogoWhatsApp />
                </span>
                <Typography variant='large'>WhatsApp</Typography>
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
                <Typography variant='large'>SMS</Typography>
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
