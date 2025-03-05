import {NextIntlClientProvider, useMessages} from 'next-intl'
import {HeaderNavigation} from '@/src/components/shared/header-navigation'

const Header: React.FC = () => {
  const messages = useMessages() as IntlMessages
  const combinedMessages = {
    ...messages.Metadata.Pages,
    ...messages.Components.LocaleSelect
  }

  return (
    <NextIntlClientProvider messages={combinedMessages}>
      <HeaderNavigation />
    </NextIntlClientProvider>
  )
}

Header.displayName = 'Header'

export {Header}
