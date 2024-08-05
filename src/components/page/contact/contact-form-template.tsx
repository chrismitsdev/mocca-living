import {
  Html, 
  Head, 
  Font, 
  Tailwind,
  Body, 
  Container, 
  Hr,
  Section, 
  Row,
  Column,
  Heading, 
  Text
} from '@react-email/components'
import {formatDate} from '#/lib/utils'
import config from '#/tailwind.config'

type ContactFormTemplateProps = {
  formData: Omit<ContactFormValues, 'consentData'>
}

function ContactFormTemplate({formData}: ContactFormTemplateProps) {
  /* eslint-disable react/jsx-no-literals */
  return (
    <Html>
      <Head>
        <Font
          webFont={{
            url: 'https://fonts.googleapis.com/css2?family=Arima:wght@100..700&family=Commissioner:wght@100..900&display=swap',
            format: 'woff2',
          }}
          fontFamily='Commissioner'
          fallbackFontFamily='Verdana'
          fontWeight={400}
          fontStyle='normal'
        />
      </Head>
      <Tailwind config={config}>
        <Body className='py-6 bg-[#ddc8a2] text-[#453227]'>
          <Container className='max-w-[576px]'>
            <Section className='p-4'>
              <Row>
                <Heading className='my-0 text-[16px]' as='h4'>
                  Mocca Living - Φόρμα επικοινωνίας
                </Heading>
              </Row>
              <Hr className='my-6 border-t-[#af7c5f]' />
              <Row>
                <Column>
                  <Text className='my-0'>Όνομα:</Text>
                  <Text className='my-0 mt-1'>Email:</Text>
                  <Text className='my-0 mt-1'>Τηλέφωνο:</Text>
                  <Text className='my-0 mt-1'>Check-in:</Text>
                  <Text className='my-0 mt-1'>Check-out:</Text>
                  <Text className='my-0 mt-1'>Σουίτα:</Text>
                  <Text className='my-0 mt-1'>Μήνυμα:</Text>
                </Column>
                <Column>
                  <Text className='my-0 font-[700]'>{formData.name}</Text>
                  <Text className='my-0 mt-1 font-[700]'>{formData.email}</Text>
                  <Text className='my-0 mt-1 font-[700]'>{formData.phone}</Text>
                  <Text className='my-0 mt-1 font-[700]'>{formatDate(formData.checkIn, 'gr')}</Text>
                  <Text className='my-0 mt-1 font-[700]'>{formatDate(formData.checkOut, 'gr')}</Text>
                  <Text className='my-0 mt-1 font-[700]'>{formData.suite}</Text>
                  <Text className='my-0 mt-1 font-[700]'>{formData.message || 'Κανένα μήνυμα'}</Text>
                </Column>
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

ContactFormTemplate.displayName = 'ContactFormTemplate'

export {ContactFormTemplate}