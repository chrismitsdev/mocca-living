import {Container} from '@/src/components/shared/container'
import {Spinner} from '@/src/components/ui/spinner'

export default function Loading() {
  return (
    <Container className='h-svh'>
      <div className='h-full flex items-center justify-center'>
        <Spinner size={56} />
      </div>
    </Container>
  )
}
