import {useTranslations} from 'next-intl'
import {Button} from '@/src/components/ui/button'
import {Separator} from '@/src/components/ui/separator'
import {ListItemLink} from './list-item-link'

function DesktopNavigation() {
  const t = useTranslations('Metadata')

  return (
    <nav className='hidden sm:block'>
      <ul
        aria-label='Desktop navigation menu'
        className='flex items-center gap-x-4'
      >
        <ListItemLink
          href='/'
          label={t('home')}
        />
        <ListItemLink
          href='/experience'
          label={t('experience')}
        />
        <ListItemLink
          href='/accommodation'
          label={t('accommodation.title')}
        />
        <ListItemLink
          href='/contact'
          label={t('contact')}
        />
        <li className='flex gap-x-6'>
          <Separator orientation='vertical' />
          <Button
            size='small'
            asChild
          >
            <a
              className='uppercase'
              href='https://www.hotelo.gr/en/properties/mocca-living-41'
              target='_blank'
              rel='noopener noreferrer'
            >
              {t('book_button')}
              <span>-15%</span>
            </a>
          </Button>
        </li>
      </ul>
    </nav>
  )
}

export {DesktopNavigation}
