import {Container} from '@/src/components/shared/container'
import {Separator} from '@/src/components/ui/separator'
import {Typography} from '@/src/components/ui/typography'
import {cn} from '@/src/lib/utils'

function Section({
  className,
  title,
  container = true,
  children,
  ...props
}: React.ComponentPropsWithRef<'section'> & {
  title?: string
  container?: boolean
}) {
  const content = (
    <>
      {title && <SectionTitle>{title}</SectionTitle>}
      {children}
    </>
  )

  return (
    <section
      className={cn('py-20 sm:py-32', className)}
      {...props}
    >
      {container ? <Container>{content}</Container> : content}
    </section>
  )
}

function SectionTitle({children}: React.PropsWithChildren) {
  return (
    <div className='mb-8 flex items-center gap-4'>
      <Typography
        className='text-surface-5 uppercase tracking-widest'
        variant='tiny'
      >
        {children}
      </Typography>
      <Separator className='max-inline-12' />
    </div>
  )
}

export {Section}
