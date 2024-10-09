'use client'

import * as React from 'react'
import {Transition, MotionConfig, AnimatePresence, motion} from 'framer-motion'
import {Typography} from '@/components/ui/typography'
import {useClickOutside} from '@/hooks/useClickOutside'
import {MessageCircleMoreIcon} from 'lucide-react'
import {LogoViber} from '@/components/logos/logo-viber'
import {LogoWhatsApp} from '@/components/logos/logo-whatsapp'

const TRANSITION: Transition = {
  bounce: 0.05,
  duration: 0.3,
  type: 'spring'
}

// href="viber://pa?chatURI=[public account URI]&text=[message text]"
// href="whatsapp://send?abid=[users name]&text=[message text]"

// viber://chat?number=%2B977-9800000000

function MessagePopover() {
  const [isOpen, setIsOpen] = React.useState(false)
  const uniqueId = React.useId()
  const formContainerRef = React.useRef<HTMLDivElement>(null)

  function openMenu() {
    setIsOpen(true)
  }

  function closeMenu() {
    setIsOpen(false)
  }

  useClickOutside(formContainerRef, function () {
    closeMenu()
  })

  React.useEffect(function () {
    function handleClosePopover(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeMenu()
      }
    }

    document.addEventListener('keydown', handleClosePopover)

    return function () {
      document.removeEventListener('keydown', handleClosePopover)
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
              className='p-4 overflow-hidden bg-surface-1 border outline-none'
              style={{
                borderRadius: 4
              }}
              ref={formContainerRef}
            >
              <div className='space-y-4'>
                <a
                  href='viber://chat?number=+306936998859'
                  className='flex items-center gap-2'
                >
                  <LogoViber />
                  <Typography variant='large'>{'Viber'}</Typography>
                </a>
                <a
                  href='whatsapp://send?phone=+306936998859'
                  className='flex items-center gap-2'
                >
                  <LogoWhatsApp />
                  <Typography variant='large'>{'WhatsApp'}</Typography>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  )
}

MessagePopover.displayName = 'MessagePopover'

export {MessagePopover}
