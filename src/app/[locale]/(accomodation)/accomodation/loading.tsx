import {Container} from '@/src/components/shared/container'
import {Spinner} from '@/src/components/ui/spinner'

export default function Loading() {
  return (
    <Container className='h-[calc(100svh-128px)]'>
      <div className='h-full flex items-center justify-center'>
        <Spinner size={48} />
      </div>
    </Container>
  )
}
