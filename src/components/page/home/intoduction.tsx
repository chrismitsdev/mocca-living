import {Container} from '@/components/shared/container'
import {Typography} from '@/components/ui/typography'

function Introduction({title, message}: {title: string; message: React.ReactNode}) {
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
