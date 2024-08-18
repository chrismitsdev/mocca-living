import {Container} from '@/components/shared/container'
import {Typography} from '@/components/ui/typography'

type IntroductionProps = {
  translations: {
    title: IntlMessages['Pages']['Accomodation']['Introdution']['title']
    message: IntlMessages['Pages']['Accomodation']['Introdution']['message']
  }
}

function Introduction({translations: {title, message}}: IntroductionProps) {
  return (
    <Container
      className='space-y-6'
      asChild
    >
      <article>
        <Typography variant='h3'>{title}</Typography>
        <Typography className='leading-8'>{message}</Typography>
      </article>
    </Container>
  )
}

Introduction.displayName = 'Introduction'

export {Introduction}
