'use client'

import {XIcon} from 'lucide-react'
import {useTranslations} from 'next-intl'
import type * as React from 'react'
import {Form} from '@/src/components/shared/form'
import {Button} from '@/src/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger
} from '@/src/components/ui/drawer'
import {
  ScrollArea,
  ScrollAreaBar,
  ScrollAreaViewport
} from '@/src/components/ui/scrollarea'
import {Separator} from '@/src/components/ui/separator'
import {VisuallyHidden} from '@/src/components/ui/visually-hidden'

interface SlugFormProps {
  slug: Slug
}

const SlugForm: React.FC<SlugFormProps> = ({slug}) => {
  const t = useTranslations('Pages.Accommodation.Slug.card.drawer')

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className='w-full sm:w-auto'>{t('trigger', {slug})}</Button>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerOverlay />
        <DrawerContent
          side='left'
          className='w-full sm:max-w-xl'
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className='px-7 py-6 space-y-2 sm:px-8 sm:py-16'>
            <DrawerTitle>{t('title', {slug})}</DrawerTitle>
            <DrawerDescription>{t('description')}</DrawerDescription>
          </div>
          <Separator />
          <ScrollArea type='always'>
            <ScrollAreaViewport className='max-h-[calc(100dvh-128px-1px)]'>
              <div className='px-7 pt-6 pb-20 space-y-4 sm:p-8'>
                <Form />
              </div>
            </ScrollAreaViewport>
            <ScrollAreaBar className='w-2 sm:w-2.5' />
          </ScrollArea>
          <DrawerClose asChild>
            <Button
              className='absolute top-2 right-2'
              variant='ghost-alt'
              size='icon-small'
            >
              <VisuallyHidden>Close drawer</VisuallyHidden>
              <XIcon />
            </Button>
          </DrawerClose>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  )
}

SlugForm.displayName = 'SlugForm'

export {SlugForm}
