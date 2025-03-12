import {
  Html,
  Head,
  Font,
  Tailwind,
  Body,
  Container,
  Img,
  Hr,
  Section,
  Row,
  Column,
  Heading,
  Text
} from '@react-email/components'
import {formatDate} from '@/src/lib/utils'

interface ContactFormTemplateProps {
  formData: Omit<ContactFormData, 'consentData'>
}

const ContactFormTemplate: React.FC<Readonly<ContactFormTemplateProps>> = ({
  formData
}) => {
  return (
    <Html>
      <Head>
        <Font
          webFont={{
            url: 'https://fonts.gstatic.com/s/commissioner/v20/tDbw2o2WnlgI0FNDgduEk4jAhwgumbU1SVfU5BD8OuRL8OstC6KOhgvBYWSFJ-Mgdrgiju6fF8m0ZEXaaR42_6ahdAo.woff2',
            format: 'woff2'
          }}
          fontFamily='Commissioner'
          fontWeight={400}
          fontStyle='normal'
          fallbackFontFamily='Verdana'
        />
      </Head>
      <Tailwind>
        <Body className='py-6 bg-[#ddc8a2] text-[#453227]'>
          <Container className='max-w-[576px]'>
            <Section className='p-4'>
              <Row className='mb-6'>
                <Img
                  src='https://4y4jwmfhzutn57mw.myfritz.net:47971/nas/filelink.lua?id=2facbccd5602da0d'
                  alt='Mocca Living logo'
                  width={100}
                  height={100}
                />
              </Row>
              <Row>
                <Heading
                  className='my-0 text-[16px]'
                  as='h4'
                >
                  Mocca Living - Φόρμα επικοινωνίας
                </Heading>
              </Row>
              <Hr className='my-6 !border-t-[#af7c5f]' />
              <Row>
                <Column>
                  <Text className='!my-0'>Όνομα:</Text>
                  <Text className='!my-0 !mt-1'>Email:</Text>
                  <Text className='!my-0 !mt-1'>Τηλέφωνο:</Text>
                  <Text className='!my-0 !mt-1'>Check-in:</Text>
                  <Text className='!my-0 !mt-1'>Check-out:</Text>
                  <Text className='!my-0 !mt-1'>Βίλα:</Text>
                  <Text className='!my-0 !mt-1'>Μήνυμα:</Text>
                </Column>
                <Column>
                  <Text className='!my-0 font-[700]'>{formData.fullName}</Text>
                  <Text className='!my-0 !mt-1 font-[700]'>
                    {formData.email}
                  </Text>
                  <Text className='!my-0 !mt-1 font-[700]'>
                    {formData.phone}
                  </Text>
                  <Text className='!my-0 !mt-1 font-[700]'>
                    {formatDate(formData.checkIn, 'gr')}
                  </Text>
                  <Text className='!my-0 !mt-1 font-[700]'>
                    {formatDate(formData.checkOut, 'gr')}
                  </Text>
                  <Text className='!my-0 !mt-1 font-[700]'>
                    {formData.villa}
                  </Text>
                  <Text className='!my-0 !mt-1 font-[700]'>
                    {formData.message || 'Κανένα μήνυμα'}
                  </Text>
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
