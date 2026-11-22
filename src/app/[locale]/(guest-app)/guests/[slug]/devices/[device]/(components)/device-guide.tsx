import {
  IconSquareNumber1,
  IconSquareNumber2,
  IconSquareNumber3,
  IconSquareNumber4
} from '@tabler/icons-react'
import {useTranslations} from 'next-intl'
import {Section} from '@/src/components/shared/section'
import {Typography} from '@/src/components/ui/typography'
import type {DeviceTextKey} from '@/src/lib/guest-app/content/device-text'
import type {DeviceGuide as Device} from '@/src/lib/guest-app/content/devices'
import type {GuestAppProperty} from '@/src/lib/guest-app/properties'

// Every device has exactly four steps (step-1 to step-4 in the messages)
const steps = [
  {key: 'step-1', icon: IconSquareNumber1},
  {key: 'step-2', icon: IconSquareNumber2},
  {key: 'step-3', icon: IconSquareNumber3},
  {key: 'step-4', icon: IconSquareNumber4}
] as const

type DeviceGuideProps = {
  slug: GuestAppProperty
  device: Device
}

function DeviceGuide({slug, device}: DeviceGuideProps) {
  const t = useTranslations('Pages.guest-app.devices')
  const tGuides = useTranslations('Pages.guest-app.device-guides')
  const Icon = device.icon

  return (
    <Section className='pt-8 sm:pt-12'>
      <div className='space-y-8'>
        {/* Phones show the icon in the header instead */}
        <span className='py-10 hidden items-center justify-center bg-surface-2 border border-surface-3 sm:flex'>
          <Icon
            className='size-16'
            aria-hidden
          />
        </span>
        <div className='space-y-4'>
          <Typography
            variant='large'
            as='h2'
          >
            {t('description')}
          </Typography>
          <Typography>
            {tGuides(`${slug}.${device.id}.description` as DeviceTextKey)}
          </Typography>
        </div>
        <div className='space-y-4'>
          <Typography
            variant='large'
            as='h2'
          >
            {t('how-to')}
          </Typography>
          <ol className='space-y-3'>
            {steps.map(({key, icon: StepIcon}) => (
              <li
                className='flex gap-3'
                key={key}
              >
                <StepIcon
                  className='shrink-0 h-8'
                  aria-hidden
                />
                <Typography>
                  {tGuides(`${slug}.${device.id}.${key}` as DeviceTextKey)}
                </Typography>
              </li>
            ))}
          </ol>
        </div>
        <div className='space-y-4'>
          <Typography
            variant='large'
            as='h2'
          >
            {t('safety')}
          </Typography>
          <Typography>
            {tGuides(`${slug}.${device.id}.safety` as DeviceTextKey)}
          </Typography>
        </div>
        <div className='space-y-4'>
          <Typography
            variant='large'
            as='h2'
          >
            {t('cleaning')}
          </Typography>
          <Typography>
            {tGuides(`${slug}.${device.id}.cleaning` as DeviceTextKey)}
          </Typography>
        </div>
      </div>
    </Section>
  )
}

export {DeviceGuide}
