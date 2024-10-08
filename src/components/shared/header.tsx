import {NextIntlClientProvider, useMessages} from 'next-intl'
import {HeaderNavigation} from '@/components/shared/header-navigation'

function Header() {
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
