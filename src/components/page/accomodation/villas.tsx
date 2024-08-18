import {Container} from '@/components/shared/container'
import {Typography} from '@/components/ui/typography'
import {Tabs, TabsList, TabsTrigger, TabsContent} from '@/components/ui/tabs'

function Villas() {
  return (
    <article>
      <Container>
        <Tabs defaultValue='georgia'>
          <TabsList>
            <TabsTrigger value='georgia'>{'Georgia'}</TabsTrigger>
            <TabsTrigger value='dimitra'>{'Dimitra'}</TabsTrigger>
          </TabsList>
          <TabsContent value='georgia'>{'Georgia'}</TabsContent>
          <TabsContent value='dimitra'>{'Dimitra'}</TabsContent>
        </Tabs>
      </Container>
    </article>
  )
}

Villas.displayName = 'Villas'

export {Villas}
