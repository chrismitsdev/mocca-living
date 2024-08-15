'use client'

import * as React from 'react'
import Image from 'next/image'
import {motion, AnimatePresence, MotionConfig} from 'framer-motion'
import {ChevronLeftIcon, ChevronRightIcon} from '@radix-ui/react-icons'
import {cn} from '#/lib/utils'
import {Button} from '@/components/ui/button'
import * as indoorImages from '#/public/images/indoor'

const images = Object.values(indoorImages).slice(0, 6)

const collapsedAspectRatio = 1 / 3
const fullAspectRatio = 3 / 2
const activeThumbMargin = 12
const thumbGap = 4

function FramerCarousel() {
  const [index, setIndex] = React.useState(0)

  return (
    <MotionConfig transition={{duration: 0.75, ease: [0.32, 0.72, 0, 1]}}>
      <div className='relative h-screen bg-black'>
        <div className='mx-auto h-full max-w-7xl flex-col flex justify-center'>
          {/* Image slides */}
          <div className='relative overflow-hidden w-full'>
            <motion.div
              className='flex'
              animate={{x: `-${index * 100}%`}}
            >
              {images.map((image, i) => (
                <Image
                  key={image.src}
                  className={cn(
                    'shrink-0 w-full h-full object-cover select-none ease-[cubic-bezier(0.32,0.72,0,1)] duration-1000',
                    i === index ? 'opacity-100' : 'opacity-10'
                  )}
                  src={image}
                  alt={`Framer carousel image ${index + 1}`}
                  draggable={false}
                  priority={true}
                />
              ))}
            </motion.div>

            {/* Slide control buttons */}
            <AnimatePresence initial={false}>
              {index > 0 && (
                <Button
                  className='absolute left-2 top-1/2 -translate-y-1/2 transition-none'
                  variant='primary-alt'
                  size='icon-normal'
                  onClick={() => setIndex(index - 1)}
                  asChild
                >
                  <motion.button
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0, pointerEvents: 'none'}}
                  >
                    <ChevronLeftIcon
                      width={24}
                      height={24}
                    />
                  </motion.button>
                </Button>
              )}
            </AnimatePresence>
            <AnimatePresence initial={false}>
              {index + 1 < images.length && (
                <Button
                  className='absolute right-2 top-1/2 -translate-y-1/2 transition-none'
                  variant='primary-alt'
                  size='icon-normal'
                  onClick={() => setIndex(index + 1)}
                  asChild
                >
                  <motion.button
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0, pointerEvents: 'none'}}
                  >
                    <ChevronRightIcon
                      width={24}
                      height={24}
                    />
                  </motion.button>
                </Button>
              )}
            </AnimatePresence>
          </div>

          {/* Image thumbnails */}
          <div className='absolute bottom-6 inset-x-0 h-14 flex justify-center overflow-hidden'>
            <motion.div
              className='flex'
              initial={false}
              style={{
                aspectRatio: fullAspectRatio,
                gap: `${thumbGap}%`
              }}
              animate={{
                x: `-${
                  index * 100 * (collapsedAspectRatio / fullAspectRatio) +
                  activeThumbMargin +
                  index * thumbGap
                }%`
              }}
            >
              {images.map((image, i) => (
                <motion.button
                  key={image.src}
                  className='shrink-0'
                  initial={false}
                  animate={i === index ? 'active' : 'inactive'}
                  variants={{
                    active: {
                      aspectRatio: fullAspectRatio,
                      marginLeft: `${activeThumbMargin}%`,
                      marginRight: `${activeThumbMargin}%`,
                      opacity: 1
                    },
                    inactive: {
                      aspectRatio: collapsedAspectRatio,
                      marginLeft: 0,
                      marginRight: 0,
                      opacity: 0.5
                    }
                  }}
                  whileHover={{opacity: 1}}
                  onClick={() => setIndex(i)}
                >
                  <Image
                    className='w-full h-full object-cover select-none'
                    src={image}
                    draggable={false}
                    alt={`Framer carousel image ${index + 1}`}
                  />
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </MotionConfig>
  )
}

FramerCarousel.displayName = 'FramerCarousel'

export {FramerCarousel}
