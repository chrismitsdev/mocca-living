import {useTranslations} from 'next-intl'
import {Container} from '@/components/shared/container'
import {Typography} from '@/components/ui/typography'
import {FadeUp} from '@/components/motion/fade-up'

function Introduction() {
  const t = useTranslations('Pages.Home.Introdution')

  return (
    <FadeUp>
      <Container
        className='space-y-6'
        asChild
      >
        <article>
          <Typography variant='h3'>{t('title')}</Typography>
          <Typography className='leading-8'>
            {t.rich('message', {
              nama: (chunks) => (
                <a
                  className='font-semibold'
                  target='_blank'
                  href='https://www.tripadvisor.com/Restaurant_Review-g7715542-d24849206-Reviews-Nama_Beach_Life_Experience-Makri_Evros_Region_East_Macedonia_and_Thrace.html'
                >
                  {chunks}
                </a>
              )
            })}
          </Typography>
        </article>
      </Container>
    </FadeUp>
  )
}

Introduction.displayName = 'Introduction'

export {Introduction}
