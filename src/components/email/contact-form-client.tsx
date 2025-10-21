import * as React from 'react'
import {
  Html,
  Head,
  Font,
  Tailwind,
  Body,
  Container,
  Img,
  Section,
  Row,
  Column,
  Heading,
  Text,
  Link
} from '@react-email/components'
import {type Locale} from 'next-intl'
import {getTranslations} from 'next-intl/server'
import {ContactFormActionState} from '@/src/lib/actions'

const ContactFormClient: React.FC<{
  formData: ContactFormActionState['data']
  locale: Locale
}> = async ({
  formData: {firstName, lastName, email, phone, message},
  locale
}) => {
  const t = await getTranslations({
    locale,
    namespace: 'Components.ContactFormClient'
  })

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
        <style>
          {`
            .main-content {
              padding: 16px !important;
            }

            @media screen and (min-width: 640px) {
              .main-content {
                padding: 24px !important;
              }
            }
          `}
        </style>
      </Head>
      <Tailwind>
        <Body className='p-2 m-0 bg-[#e7d9be] text-[#453227] opacity-100'>
          <Container>
            <Section className='px-4 py-8'>
              <Img
                src='https://4y4jwmfhzutn57mw.myfritz.net:47971/nas/filelink.lua?id=2facbccd5602da0d'
                alt='Mocca Living logo'
                className='mx-auto'
                width={100}
                height={100}
              />
            </Section>

            <Section
              className='overflow-hidden rounded'
              style={{border: '1px solid #c7b492'}}
            >
              <Row>
                <Img
                  src='https://4y4jwmfhzutn57mw.myfritz.net:47971/nas/filelink.lua?id=d3daaf0543d36f96'
                  alt='Contact form received'
                  className='max-w-[600px] w-full'
                />
              </Row>
              <Row className='main-content'>
                <Column>
                  <Heading className='text-lg'>
                    {t('header')} {firstName} {lastName},
                  </Heading>
                  <Text>{t('thanks')}</Text>

                  <Text>{t('summary')}</Text>
                  <Text className='my-0'>
                    {t('name')}: {firstName} {lastName}
                  </Text>
                  <Text className='my-0'>
                    {t('email')}: {email}
                  </Text>
                  <Text className='my-0'>
                    {t('phone')}: {phone}
                  </Text>
                  <Text className='mt-0'>
                    {t('message.title')}: {message || t('message.empty')}
                  </Text>

                  <Text>{t('footer')}</Text>
                </Column>
              </Row>
            </Section>

            <Section className='px-4 py-8'>
              <Row>
                <Text className='my-0 text-[10px] text-center leading-6'>
                  &copy; {new Date().getFullYear()} | Mocca Living, Makri Evros,
                  Greece |{' '}
                  <Link
                    className='text-inherit'
                    href='https://www.moccaliving.com'
                    target='_blank'
                  >
                    www.moccaliving.com
                  </Link>
                </Text>
              </Row>

              <Row className='mt-4'>
                <Column
                  align='right'
                  className='pr-2'
                >
                  <Link
                    className='p-1 bg-surface-3 inline-block rounded'
                    href='https://www.facebook.com/profile.php?id=61566665200042'
                    target='_blank'
                  >
                    <Img
                      src='https://4y4jwmfhzutn57mw.myfritz.net:47971/nas/filelink.lua?id=cfb144708085ce67'
                      alt='Facebook logo'
                      width={24}
                    />
                  </Link>
                </Column>
                <Column
                  align='left'
                  className='pl-2'
                >
                  <Link
                    className='p-1 bg-surface-3 inline-block rounded'
                    href='https://www.instagram.com/moccaliving.premiumstay/'
                    target='_blank'
                  >
                    <Img
                      src='https://4y4jwmfhzutn57mw.myfritz.net:47971/nas/filelink.lua?id=e546d6a2349249cb'
                      alt='Instagram logo'
                      width={24}
                    />
                  </Link>
                </Column>
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

ContactFormClient.displayName = 'ContactFormClient'

export {ContactFormClient}
