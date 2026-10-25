'use client'

import {useParams} from 'next/navigation'
import {type Locale, useLocale, useTranslations} from 'next-intl'
import {useState} from 'react'
import {Button} from '@/src/components/ui/button'
import {Separator} from '@/src/components/ui/separator'
import {Link} from '@/src/i18n/navigation'
import {HOTELO} from '@/src/lib/constants'

const hrefLookup: Record<PropertySlug, (locale: Locale) => string> = {
  'mocca-by-the-sea-dimitra': HOTELO.moccaSea,
  'mocca-by-the-sea-georgia': HOTELO.moccaSea,
  'mocca-city': HOTELO.moccaCity
}

function isPropertySlug(slug: unknown): slug is PropertySlug {
  return typeof slug === 'string' && slug in hrefLookup
}

function BookButton() {
  const params = useParams()
  // Snapshot on mount: the exiting page keeps its slug during the page transition
  const [slug] = useState(params.slug)
  const locale = useLocale()
  const t = useTranslations('Pages.accommodation.slug.details.static')

  if (!isPropertySlug(slug)) {
    return null
  }

  return (
    <div className='flex gap-x-4 sm:gap-x-6'>
      <Button
        className='bg-brand-8'
        size='small'
        asChild
      >
        <Link
          href={hrefLookup[slug](locale)}
          target='_blank'
          rel='noopener noreferrer'
        >
          {`${t('book-button')} -15%`}
        </Link>
      </Button>
      <Separator
        className='self-stretch'
        orientation='vertical'
      />
    </div>
  )
}

export {BookButton}
