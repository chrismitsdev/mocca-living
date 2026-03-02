import {
  Body,
  Column,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Row,
  Section,
  Tailwind,
  Text
} from '@react-email/components'
import type {ContactFormActionState} from '@/src/lib/actions'

const ContactFormInternal: React.FC<
  Readonly<ContactFormActionState['data']>
> = ({firstName, lastName, email, phone, message}) => {
  return (
    <Html>
      <Head>
        <Font
          webFont={{
            url: 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hiA.woff2',
            format: 'woff2'
          }}
          fontFamily='Inter'
          fontWeight={400}
          fontStyle='normal'
          fallbackFontFamily='Verdana'
        />
      </Head>
      <Tailwind>
        <Body className='m-0 bg-[#e7d9be] text-[#453227]'>
          <Container className='max-w-xl'>
            <Section className='px-4 pt-8 pb-6'>
              <Row className='mb-6'>
                <Link
                  href='https://moccaliving.com'
                  target='_blank'
                >
                  <Img
                    src='https://4y4jwmfhzutn57mw.myfritz.net:47971/nas/filelink.lua?id=2facbccd5602da0d'
                    alt='Mocca Living logo'
                    width={100}
                    height={100}
                  />
                </Link>
              </Row>
              <Row>
                <Heading
                  className='my-0'
                  as='h4'
                >
                  Νέα υποβολή φόρμας
                </Heading>
              </Row>
            </Section>
            <Hr className='my-0  border-t-surface-4' />
            <Section className='px-4 pt-6 pb-8'>
              <Row className='mb-6'>
                <Column>
                  <Heading
                    as='h5'
                    className='my-0 leading-6'
                  >
                    Όνομα:
                  </Heading>
                  <Text className='my-0'>{firstName}</Text>
                </Column>
              </Row>
              <Row className='mb-6'>
                <Column>
                  <Heading
                    as='h5'
                    className='my-0 leading-6'
                  >
                    Επίθετο:
                  </Heading>
                  <Text className='my-0'>{lastName}</Text>
                </Column>
              </Row>
              <Row className='mb-6'>
                <Column>
                  <Heading
                    as='h5'
                    className='my-0 leading-6'
                  >
                    Email:
                  </Heading>
                  <Link
                    className='text-sm leading-6'
                    href={`mailto:${email}`}
                  >
                    {email}
                  </Link>
                </Column>
              </Row>
              <Row className='mb-6'>
                <Column>
                  <Heading
                    as='h5'
                    className='my-0 leading-6'
                  >
                    Τηλέφωνο:
                  </Heading>
                  <Link
                    className='text-sm leading-6'
                    href={`tel:${phone}`}
                    target='_blank'
                  >
                    {phone}
                  </Link>
                </Column>
              </Row>
              <Row className='mb-6'>
                <Column>
                  <Heading
                    as='h5'
                    className='my-0 leading-6'
                  >
                    Μήνυμα:
                  </Heading>
                  <Text className='my-0'>
                    {message || 'Ο χρήστης δεν άφησε κάποιο μήνυμα'}
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

ContactFormInternal.displayName = 'ContactFormInternal'

export {ContactFormInternal}
