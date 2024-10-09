'use client'

import * as React from 'react'
import {motion, MotionConfig, Transition} from 'framer-motion'
import {MessageCircleMoreIcon, MessageCircleIcon} from 'lucide-react'
import {useClickOutside} from '@/hooks/useClickOutside'
import {Typography} from '@/components/ui/typography'
import {Button} from '@/components/ui/button'
import {LogoViber} from '@/components/logos/logo-viber'
import {LogoWhatsApp} from '@/components/logos/logo-whatsapp'

const transition: Transition = {
  delay: 0,
  duration: 0.3,
  bounce: 0.05,
  type: 'spring'
}

function ExpandablePopup() {
  const [isOpen, setIsOpen] = React.useState(false)
  const contentRef = React.useRef<HTMLDivElement>(null)
  useClickOutside(contentRef, function () {
    setIsOpen(false)
  })

  return (
    <MotionConfig transition={transition}>
      <motion.div
        layout
        className='fixed bottom-2 right-2'
      >
        {!isOpen ? (
          <motion.button
            // layoutId='popup'
            className='p-2 bg-primary text-primary-foreground rounded'
            onClick={() => setIsOpen(true)}
          >
            <MessageCircleMoreIcon size={24} />
          </motion.button>
        ) : (
          <motion.div
            // layoutId='popup'
            className='p-4 space-y-4 bg-surface-1 border outline-none rounded'
            ref={contentRef}
          >
            <a
              href='viber://chat?number=+306936998859'
              className='flex items-center gap-2'
              aria-label='Viber messaging'
              target='_blank'
            >
              <span>
                <LogoViber />
              </span>
              <Typography variant='large'>{'Viber'}</Typography>
            </a>
            <a
              href='whatsapp://send?phone=+306936998859'
              className='flex items-center gap-2'
              aria-label='WhatsApp messaging'
            >
              <span>
                <LogoWhatsApp />
              </span>
              <Typography variant='large'>{'WhatsApp'}</Typography>
            </a>
            <a
              className='flex items-center gap-2'
              href='sms:+306936998859'
              aria-label='Open messaging app to send a text message'
            >
              <Button
                className='rounded-md'
                size='icon-small'
                asChild
              >
                <span>
                  <MessageCircleIcon size={24} />
                </span>
              </Button>
              <Typography variant='large'>{'SMS'}</Typography>
            </a>
          </motion.div>
        )}
      </motion.div>
    </MotionConfig>
  )
}

ExpandablePopup.displayName = 'ExpandablePopup'

export {ExpandablePopup}
