import {NextIntlClientProvider, useMessages} from 'next-intl'
import {HeaderNavigation} from '@/trash/header-navigation'

const Header: React.FC = () => {
  const messages = useMessages() as IntlMessages

  return (
    <NextIntlClientProvider
      messages={{
        ...messages.Metadata.Pages,
        ...messages.Components.LocaleSwitcher
      }}
    >
      <HeaderNavigation />
    </NextIntlClientProvider>
  )
}

Header.displayName = 'Header'

export {Header}
