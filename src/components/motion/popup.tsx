'use client'

import * as React from 'react'
import {motion} from 'framer-motion'
import {MessageCircleMoreIcon} from 'lucide-react'

function ExpandablePopup() {
  return (
    <motion.div>
      <motion.button className=''>
        <MessageCircleMoreIcon size={24} />
      </motion.button>
      <motion.div></motion.div>
    </motion.div>
  )
}
