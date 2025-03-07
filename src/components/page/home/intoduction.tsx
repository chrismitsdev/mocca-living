import {useTranslations} from 'next-intl'
import {Container} from '@/src/components/shared/container'
import {Typography} from '@/src/components/ui/typography'

const Introduction: React.FC = () => {
  const t = useTranslations('Pages.Home.Introdution')

  return (
    <Container
      className='space-y-6'
      asChild
    >
      <section>
        <Typography variant='h3'>{t('title')}</Typography>
        <Typography className='leading-8'>
          {t.rich('message', {
            nama: (chunks) => (
              <a
                className='font-semibold hover:underline'
                target='_blank'
                href='https://www.tripadvisor.com/Restaurant_Review-g7715542-d24849206-Reviews-Nama_Beach_Life_Experience-Makri_Evros_Region_East_Macedonia_and_Thrace.html'
              >
                {chunks}
              </a>
            )
          })}
        </Typography>
      </section>
    </Container>
  )
}

Introduction.displayName = 'Introduction'

export {Introduction}
