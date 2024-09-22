import {getTranslations} from 'next-intl/server'
import {useTranslations} from 'next-intl'
import {unstable_setRequestLocale} from 'next-intl/server'
import {Typography} from '@/components/ui/typography'
import {InterceptorModal} from '@/components/shared/interceptor-modal'
import {DialogTitle} from '@/components/ui/dialog'
import {
  ScrollArea,
  ScrollAreaViewport,
  ScrollAreaBar
} from '@/components/ui/scrollarea'
import {Separator} from '@/components/ui/separator'

export async function generateMetadata({params: {locale}}: Params) {
  const t = await getTranslations({locale, namespace: 'Metadata.Pages'})

  return {
    title: `${t('privacy')} | Mocca Living`
  }
}

export default function InterceptedPrivacyPage({params: {locale}}: Params) {
  unstable_setRequestLocale(locale)
  const t = useTranslations()

  return (
    <InterceptorModal>
      <DialogTitle className='p-4'>{t('Metadata.Pages.privacy')}</DialogTitle>
      <Separator />
      <ScrollArea
        type='always'
        className='h-[calc(100%-56px-1px)]'
      >
        <ScrollAreaViewport>
          <div className='p-4 space-y-4'>
            <article className='space-y-0.5'>
              <Typography variant='h6'>{t('Pages.Privacy.title')}</Typography>
              <Typography variant='small'>
                {t('Pages.Privacy.content')}
              </Typography>
            </article>
            <article className='space-y-0.5'>
              <Typography variant='h6'>
                {t('Pages.Privacy.sub-title')}
              </Typography>
              <Typography variant='small'>
                {t('Pages.Privacy.sub-content')}
              </Typography>
            </article>
          </div>
        </ScrollAreaViewport>
        <ScrollAreaBar />
      </ScrollArea>
    </InterceptorModal>
  )
}
