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
} from 'react-email'

export default function InternalFormDev() {
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
                  rel='noopener noreferrer'
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
                    Όνοματεπώνυμο:
                  </Heading>
                  <Text className='my-0'>Chris Mitsiaris</Text>
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
                    href={`mailto:chrismits88@gmail.com`}
                  >
                    chrismits88@gmail.com
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
                    href={`tel:+306973993703`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    +306973993703
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
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
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

InternalFormDev.displayName = 'InternalFormDev'
