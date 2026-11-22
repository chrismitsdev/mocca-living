import {useTranslations} from 'next-intl'
import {CopyButton} from '@/src/app/[locale]/(guest-app)/(components)/copy-button'
import {Section} from '@/src/components/shared/section'
import {Card, CardContent} from '@/src/components/ui/card'
import {Typography} from '@/src/components/ui/typography'
import {guestAppEnv} from '@/src/lib/guest-app/env'
import type {GuestAppProperty} from '@/src/lib/guest-app/properties'

// Server-only: the Wi-Fi details come from env variables, never the repo
function WifiDetails({slug}: {slug: GuestAppProperty}) {
  const t = useTranslations('Pages.guest-app.wifi')
  const {network, password} = guestAppEnv.wifi(slug)

  return (
    <Section className='pt-8 sm:pt-12'>
      <Card>
        <CardContent className='space-y-6'>
          {password ? (
            <>
              {network && (
                <div>
                  <Typography
                    className='text-surface-5'
                    variant='small'
                  >
                    {t('network')}
                  </Typography>
                  <Typography variant='h4'>{network}</Typography>
                </div>
              )}
              <div>
                <Typography
                  className='text-surface-5'
                  variant='small'
                >
                  {t('password')}
                </Typography>
                <Typography
                  className='font-mono break-all select-all'
                  variant='h4'
                >
                  {password}
                </Typography>
              </div>
              <CopyButton
                value={password}
                label={t('copy')}
                copiedLabel={t('copied')}
                failedLabel={t('copy-failed')}
                failedDescription={t('copy-failed-hint')}
              />
            </>
          ) : (
            <Typography>{t('missing')}</Typography>
          )}
        </CardContent>
      </Card>
    </Section>
  )
}

export {WifiDetails}
