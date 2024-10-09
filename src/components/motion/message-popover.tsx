'use client'

import * as React from 'react'
import {Transition, MotionConfig, AnimatePresence, motion} from 'framer-motion'
import {MessageCircleMoreIcon, MessageCircleIcon} from 'lucide-react'
import {useClickOutside} from '@/hooks/useClickOutside'
import {Typography} from '@/components/ui/typography'
import {Button} from '@/components/ui/button'
import {LogoViber} from '@/components/logos/logo-viber'
import {LogoWhatsApp} from '@/components/logos/logo-whatsapp'

const TRANSITION: Transition = {
  delay: 0,
  duration: 0.3,
  bounce: 0.05,
  type: 'spring'
}

function MessagePopover() {
  const [isOpen, setIsOpen] = React.useState(false)
  const uniqueId = React.useId()
  const ref = React.useRef<HTMLDivElement>(null)

  useClickOutside(ref, function () {
    closeMenu()
  })

  function openMenu() {
    setIsOpen(true)
  }

  function closeMenu() {
    setIsOpen(false)
  }

  React.useEffect(function () {
    function handleEscapePress(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeMenu()
      }
    }

    document.addEventListener('keydown', handleEscapePress)
    return function () {
      document.removeEventListener('keydown', handleEscapePress)
    }
  }, [])

  return (
    <MotionConfig transition={TRANSITION}>
      <div className='fixed bottom-2 right-2'>
        <motion.button
          key='button'
          layoutId={`popover-${uniqueId}`}
          className='p-2 fixed bottom-2 right-2 flex items-center justify-center bg-primary text-primary-foreground outline-none'
          style={{
            borderRadius: 4
          }}
          onClick={openMenu}
        >
          <MessageCircleMoreIcon size={24} />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              layoutId={`popover-${uniqueId}`}
              className='p-4 space-y-4 bg-surface-1 border outline-none'
              style={{
                borderRadius: 4
              }}
              ref={ref}
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
        </AnimatePresence>
      </div>
    </MotionConfig>
  )
}

MessagePopover.displayName = 'MessagePopover'

export {MessagePopover}
