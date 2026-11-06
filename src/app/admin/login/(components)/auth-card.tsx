import {Section} from '@/src/components/shared/section'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/src/components/ui/card'

function AuthCard({
  title,
  description,
  children
}: React.PropsWithChildren<{title: string; description: string}>) {
  return (
    <Section>
      <Card className='mx-auto max-inline-lg sm:p-10'>
        <CardHeader className='text-center'>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </Section>
  )
}

export {AuthCard}
